import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import { compileFromFile } from 'json-schema-to-typescript';
import YAML from 'yaml';

const outDir = process.env.OUTPUT_DIR;
if (!outDir) {
  console.error('OUTPUT_DIR env var is required');
  process.exit(2);
}

const repoDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const schemaRoot = path.join(repoDir, 'schemas');
const methodSchemasDir = path.join(schemaRoot, 'methods');
const manifestPath = path.join(repoDir, 'manifest.yaml');

await fs.mkdir(outDir, { recursive: true });

const schemaFiles = await fg(['**/*.schema.json'], {
  cwd: methodSchemasDir,
  absolute: true,
  onlyFiles: true,
});

schemaFiles.sort((a, b) => a.localeCompare(b));

const exports = [];

for (const schemaFile of schemaFiles) {
  const base = path.basename(schemaFile).replace(/\.schema\.json$/, '');
  const outFile = path.join(outDir, `${base}.ts`);

  const ts = await compileFromFile(schemaFile, {
    bannerComment: '/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */',
    style: {
      singleQuote: true,
    },
    additionalProperties: false,
  });

  await fs.writeFile(outFile, ts, 'utf8');
  // Export only the primary top-level type to avoid name collisions between
  // helper types generated for different schemas (e.g. EmailBase, Keywords).
  exports.push(`export type { ${typeNameFromSchemaBase(base)} } from './${base}';`);
}

function pascalCase(str) {
  return String(str)
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');
}

function typeNameFromSchemaBase(base) {
  // e.g. Email.get.args -> EmailGetArgs
  return base
    .split('.')
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');
}

function schemaBaseFromPath(schemaPath) {
  return path.basename(schemaPath).replace(/\.schema\.json$/, '');
}

const manifestText = await fs.readFile(manifestPath, 'utf8');
const manifest = YAML.parse(manifestText);
const methods = Array.isArray(manifest?.methods) ? manifest.methods : [];
const capabilities = Array.isArray(manifest?.capabilities) ? manifest.capabilities : [];

function jsonPointerToTopLevelProp(pointer) {
  if (typeof pointer !== 'string') return undefined;
  if (!pointer.startsWith('/')) return undefined;
  const parts = pointer.split('/').filter(Boolean);
  if (parts.length !== 1) return undefined;
  return parts[0];
}

function normalizeJsonPointer(pointer) {
  if (typeof pointer !== 'string') return undefined;
  if (!pointer.startsWith('/')) return undefined;
  return pointer;
}

// Generate a thin typed client and methods mapping, driven by manifest.yaml
const methodImports = [];
const methodTypeEntries = [];
const wrapperFns = [];
const batchMethodFns = [];

const dxProvidePathsByMethod = new Map();
const dxAcceptsByMethod = new Map();

for (const m of methods) {
  const name = m?.name;
  const cap = m?.capability;
  const argsSchema = m?.argsSchema;
  const responseSchema = m?.responseSchema;
  if (!name || !argsSchema || !responseSchema) continue;

  const dx = m?.dx ?? {};
  const resultRefs = dx?.resultRefs ?? {};
  const providesRaw = Array.isArray(resultRefs?.provides) ? resultRefs.provides : [];
  const acceptsRaw = Array.isArray(resultRefs?.accepts) ? resultRefs.accepts : [];

  const providePaths = providesRaw
    .map((p) => normalizeJsonPointer(p?.responsePath))
    .filter(Boolean);
  if (providePaths.length > 0) dxProvidePathsByMethod.set(name, [...new Set(providePaths)]);

  const accepts = acceptsRaw
    .map((a) => {
      const argKey = typeof a?.argKey === 'string' ? a.argKey : undefined;
      const targetArgPath = normalizeJsonPointer(a?.targetArgPath);
      const sourceMethod = typeof a?.source?.method === 'string' ? a.source.method : undefined;
      const sourceResponsePath = normalizeJsonPointer(a?.source?.responsePath);
      const targetProp = jsonPointerToTopLevelProp(targetArgPath);
      if (!argKey || !targetArgPath || !sourceMethod || !sourceResponsePath || !targetProp) return undefined;
      return {
        argKey,
        targetArgPath,
        targetProp,
        sourceMethod,
        sourceResponsePath,
      };
    })
    .filter(Boolean);
  if (accepts.length > 0) dxAcceptsByMethod.set(name, accepts);

  const argsBase = schemaBaseFromPath(argsSchema);
  const respBase = schemaBaseFromPath(responseSchema);
  const argsType = typeNameFromSchemaBase(argsBase);
  const respType = typeNameFromSchemaBase(respBase);

  const acceptsForMethod = dxAcceptsByMethod.get(name);
  const dxArgsType = acceptsForMethod ? `${argsType}Dx` : argsType;

  methodImports.push(`import type { ${argsType} } from './${argsBase}';`);
  methodImports.push(`import type { ${respType} } from './${respBase}';`);

  methodTypeEntries.push(
    `  '${name}': { args: ${dxArgsType}; response: ${respType}; capability: '${cap}' }`,
  );

  const fnName = pascalCase(name.replace('/', '_'))
    .replace(/_+/g, '')
    .replace(/\W+/g, '');
  wrapperFns.push(
    `export const ${fnName} = (client: JmapApiClient, args: ${dxArgsType}) => client.call('${name}', args);`,
  );

  batchMethodFns.push(
    `  ${fnName}(args: Methods['${name}']['args']): CallHandle<'${name}'> {\n` +
      `    return this.call('${name}', args);\n` +
      `  }\n`,
  );
}

const clientTs = `/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */\n\n` +
`export type MethodCall = [name: string, args: unknown, callId: string];\n` +
`export type MethodResponse = [name: string, response: unknown, callId: string];\n\n` +
`export interface JmapRequestBody {\n` +
`  using: readonly string[];\n` +
`  methodCalls: MethodCall[];\n` +
`}\n\n` +
`export interface JmapResponseBody {\n` +
`  methodResponses: MethodResponse[];\n` +
`  sessionState?: string;\n` +
`}\n\n` +
`export type MethodsMap = Record<string, { args: unknown; response: unknown }>;\n\n` +
`export interface JmapClientConfig {\n` +
`  apiUrl: string;\n` +
`  using: readonly string[];\n` +
`  authorization?: string;\n` +
`  fetch?: typeof fetch;\n` +
`}\n\n` +
`export class JmapClient<M extends MethodsMap> {\n` +
`  private readonly apiUrl: string;\n` +
`  private readonly using: readonly string[];\n` +
`  private readonly authorization?: string;\n` +
`  private readonly fetchImpl: typeof fetch;\n` +
`  private callSeq = 0;\n\n` +
`  constructor(config: JmapClientConfig) {\n` +
`    this.apiUrl = config.apiUrl;\n` +
`    this.using = config.using;\n` +
`    this.authorization = config.authorization;\n` +
`    this.fetchImpl = ((config.fetch ?? globalThis.fetch) as typeof fetch).bind(globalThis);\n` +
`  }\n\n` +
`  nextCallId(): string {\n` +
`    return String(++this.callSeq);\n` +
`  }\n\n` +
`  async request(methodCalls: MethodCall[]): Promise<JmapResponseBody> {\n` +
`    return this.post({ using: this.using, methodCalls });\n` +
`  }\n\n` +
`  async call<K extends keyof M & string>(name: K, args: M[K]['args']): Promise<M[K]['response']> {\n` +
`    const callId = this.nextCallId();\n` +
`    const body: JmapRequestBody = { using: this.using, methodCalls: [[name, args, callId]] };\n` +
`    const res = await this.post(body);\n` +
`    const match = res.methodResponses.find((r) => r[2] === callId);\n` +
`    if (!match) throw new Error('Missing JMAP response for callId ' + callId);\n` +
`    return match[1] as M[K]['response'];\n` +
`  }\n\n` +
`  async batch(calls: Array<{ name: keyof M & string; args: unknown }>): Promise<JmapResponseBody> {\n` +
`    const methodCalls: MethodCall[] = calls.map((c) => [c.name, c.args, this.nextCallId()]);\n` +
`    return this.request(methodCalls);\n` +
`  }\n\n` +
`  private async post(body: JmapRequestBody): Promise<JmapResponseBody> {\n` +
`    const headers: Record<string, string> = { 'content-type': 'application/json' };\n` +
`    if (this.authorization) headers['authorization'] = this.authorization;\n` +
`    const resp = await this.fetchImpl(this.apiUrl, { method: 'POST', headers, body: JSON.stringify(body) });\n` +
`    if (!resp.ok) {\n` +
`      const text = await resp.text().catch(() => '');\n` +
`      throw new Error('JMAP HTTP ' + resp.status + ': ' + text);\n` +
`    }\n` +
`    return (await resp.json()) as JmapResponseBody;\n` +
`  }\n` +
`}\n`;

await fs.writeFile(path.join(outDir, 'client.ts'), clientTs, 'utf8');

const sessionTs = `/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */\n\n` +
  `export type JmapCapabilityName = string;\n\n` +
  `export type JmapSessionCapabilities = Record<JmapCapabilityName, unknown>;\n\n` +
  `export type JmapAccountCapabilities = Record<JmapCapabilityName, unknown>;\n\n` +
  `export type JmapSessionAccount = Readonly<{\n` +
  `  name?: string;\n` +
  `  isPersonal?: boolean;\n` +
  `  isReadOnly?: boolean;\n` +
  `  accountCapabilities?: JmapAccountCapabilities;\n` +
  `}>;\n\n` +
  `export type JmapSessionResource = Readonly<{\n` +
  `  capabilities: JmapSessionCapabilities;\n` +
  `  accounts: Record<string, JmapSessionAccount>;\n` +
  `  primaryAccounts?: Record<string, string>;\n` +
  `  username?: string;\n` +
  `  apiUrl: string;\n` +
  `  downloadUrl?: string;\n` +
  `  uploadUrl?: string;\n` +
  `  eventSourceUrl?: string;\n` +
  `  state: string;\n` +
  `}>;\n\n` +
  `export class JmapSessionError extends Error {\n` +
  `  readonly status: number;\n` +
  `  readonly bodyText: string;\n\n` +
  `  constructor(message: string, status: number, bodyText: string) {\n` +
  `    super(message);\n` +
  `    this.name = 'JmapSessionError';\n` +
  `    this.status = status;\n` +
  `    this.bodyText = bodyText;\n` +
  `  }\n` +
  `}\n\n` +
  `export type GetJmapSessionConfig = Readonly<{\n` +
  `  baseUrl: string;\n` +
  `  authorization?: string;\n` +
  `  fetch?: typeof fetch;\n` +
  `  wellKnownPath?: string;\n` +
  `  credentials?: RequestCredentials;\n` +
  `  signal?: AbortSignal;\n` +
  `}>;\n\n` +
  `function joinUrl(baseUrl: string, path: string): string {\n` +
  `  const b = baseUrl.replace(/\\/+$/, '');\n` +
  `  const p = path.startsWith('/') ? path : '/' + path;\n` +
  `  return b + p;\n` +
  `}\n\n` +
  `export async function getJmapSession(config: GetJmapSessionConfig): Promise<JmapSessionResource> {\n` +
  `  const fetchImpl = ((config.fetch ?? globalThis.fetch) as typeof fetch).bind(globalThis);\n` +
  `  const url = joinUrl(config.baseUrl, config.wellKnownPath ?? '/.well-known/jmap');\n` +
  `  const headers: Record<string, string> = { accept: 'application/json' };\n` +
  `  if (config.authorization) headers['authorization'] = config.authorization;\n` +
  `\n` +
  `  const res = await fetchImpl(url, { method: 'GET', headers, credentials: config.credentials, signal: config.signal });\n` +
  `  if (!res.ok) {\n` +
  `    const bodyText = await res.text().catch(() => '');\n` +
  `    throw new JmapSessionError('Failed to fetch JMAP session (' + res.status + ')', res.status, bodyText);\n` +
  `  }\n` +
  `  return (await res.json()) as JmapSessionResource;\n` +
  `}\n`;

await fs.writeFile(path.join(outDir, 'session.ts'), sessionTs, 'utf8');

const refsTs = `/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */\n\n` +
  `export type ResultRef<M extends string = string, P extends string = string> = Readonly<{\n` +
  `  resultOf: string;\n` +
  `  name: M;\n` +
  `  path: P;\n` +
  `}>;\n\n` +
  `export const resultRef = <M extends string, P extends string>(resultOf: string, name: M, path: P): ResultRef<M, P> => ({\n` +
  `  resultOf,\n` +
  `  name,\n` +
  `  path,\n` +
  `});\n`;

await fs.writeFile(path.join(outDir, 'refs.ts'), refsTs, 'utf8');

const uniq = (arr) => [...new Set(arr)];
const hasDxAccepts = dxAcceptsByMethod.size > 0;
const hasDxProvides = dxProvidePathsByMethod.size > 0;

const dxProvideMappingLines = [];
for (const [methodName, paths] of dxProvidePathsByMethod.entries()) {
  dxProvideMappingLines.push(`  '${methodName}': ${paths.map((p) => `'${p}'`).join(' | ')}`);
}

const dxArgsTypeLines = [];
for (const m of methods) {
  const name = m?.name;
  const argsSchema = m?.argsSchema;
  if (!name || !argsSchema) continue;
  const accepts = dxAcceptsByMethod.get(name);
  if (!accepts) continue;

  const argsBase = schemaBaseFromPath(argsSchema);
  const argsType = typeNameFromSchemaBase(argsBase);
  const dxType = `${argsType}Dx`;

  const variants = accepts.map((a) => {
    const omitted = a.targetProp;
    return `  | (Omit<${argsType}, '${omitted}'> & { '${a.argKey}': ResultRef<'${a.sourceMethod}', '${a.sourceResponsePath}'>; ${omitted}?: never })`;
  });

  dxArgsTypeLines.push(
    `export type ${dxType} =\n` +
      `  | ${argsType}\n` +
      `${variants.join('\n')};\n`,
  );
}

const methodsTs = `/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */\n\n` +
  `${uniq(methodImports).join('\n')}\n` +
  (hasDxAccepts ? `import type { ResultRef } from './refs';\n` : ``) +
  `\nimport { JmapClient } from './client';\n\n` +
  `export const defaultUsing = ${JSON.stringify(capabilities, null, 2)} as const;\n\n` +
  `export type Methods = {\n${methodTypeEntries.join(',\n')}\n};\n\n` +
  `export type JmapApiClient = JmapClient<Methods>;\n\n` +
  `export const createClient = (config: Omit<import('./client').JmapClientConfig, 'using'> & { using?: readonly string[] }) =>\n` +
  `  new JmapClient<Methods>({ ...config, using: config.using ?? defaultUsing });\n\n` +
  (hasDxProvides
    ? `export type DxProvidePathsByMethod = {\n${dxProvideMappingLines.join(',\n')}\n};\n\n`
    : `export type DxProvidePathsByMethod = {};\n\n`) +
  (dxArgsTypeLines.length > 0 ? `${dxArgsTypeLines.join('\n')}\n` : ``) +
  `${wrapperFns.join('\n')}\n`;

await fs.writeFile(path.join(outDir, 'methods.ts'), methodsTs, 'utf8');

const batchTs = `/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */\n\n` +
  `import type { MethodCall, MethodResponse, JmapResponseBody, JmapClient } from './client';\n` +
  `import type { Methods, DxProvidePathsByMethod } from './methods';\n` +
  `import type { ResultRef } from './refs';\n\n` +
  `export type CallHandle<K extends keyof Methods & string> = Readonly<{\n` +
  `  name: K;\n` +
  `  callId: string;\n` +
  `}>;\n\n` +
  `export type DxProvidePath<K extends keyof Methods & string> =\n` +
  `  K extends keyof DxProvidePathsByMethod ? DxProvidePathsByMethod[K] : never;\n\n` +
  `export type JmapMethodError = Readonly<{\n` +
  `  type: string;\n` +
  `  description?: string;\n` +
  `  [k: string]: unknown;\n` +
  `}>;\n\n` +
  `export type CallResult<K extends keyof Methods & string> =\n` +
  `  | { ok: true; value: Methods[K]['response'] }\n` +
  `  | { ok: false; error: JmapMethodError };\n\n` +
  `export class JmapBatchResult {\n` +
  `  private readonly byCallId: Map<string, MethodResponse>;\n\n` +
  `  constructor(response: JmapResponseBody) {\n` +
  `    this.byCallId = new Map(response.methodResponses.map((r) => [r[2], r]));\n` +
  `  }\n\n` +
  `  get<K extends keyof Methods & string>(handle: CallHandle<K>): CallResult<K> {\n` +
  `    const row = this.byCallId.get(handle.callId);\n` +
  `    if (!row) return { ok: false, error: { type: 'missingMethodResponse', description: 'Missing response for callId ' + handle.callId } };\n` +
  `    const [name, payload] = row;\n` +
  `    if (name === 'error') return { ok: false, error: payload as JmapMethodError };\n` +
  `    return { ok: true, value: payload as Methods[K]['response'] };\n` +
  `  }\n` +
  `}\n\n` +
  `export class JmapBatch {\n` +
  `  private readonly calls: MethodCall[] = [];\n\n` +
  `  private readonly client: JmapClient<Methods>;\n\n` +
  `  constructor(client: JmapClient<Methods>) {\n` +
  `    this.client = client;\n` +
  `  }\n\n` +
  `  call<K extends keyof Methods & string>(name: K, args: Methods[K]['args']): CallHandle<K> {\n` +
  `    const callId = this.client.nextCallId();\n` +
  `    this.calls.push([name, args, callId]);\n` +
  `    return { name, callId };\n` +
  `  }\n\n` +
  `${batchMethodFns.join('\n')}` +
  `  ref<K extends keyof Methods & string>(handle: CallHandle<K>, path: DxProvidePath<K>): ResultRef<K, DxProvidePath<K>> {\n` +
  `    return { resultOf: handle.callId, name: handle.name, path };\n` +
  `  }\n\n` +
  `  async execute(): Promise<JmapBatchResult> {\n` +
  `    const res = await this.client.request(this.calls);\n` +
  `    return new JmapBatchResult(res);\n` +
  `  }\n` +
  `}\n\n` +
  `export const createBatch = (client: JmapClient<Methods>) => new JmapBatch(client);\n`;

await fs.writeFile(path.join(outDir, 'batch.ts'), batchTs, 'utf8');

exports.push(`export * from './client';`);
exports.push(`export * from './session';`);
exports.push(`export * from './refs';`);
exports.push(`export * from './methods';`);
exports.push(`export * from './batch';`);

await fs.writeFile(path.join(outDir, 'index.ts'), exports.join('\n') + '\n', 'utf8');
