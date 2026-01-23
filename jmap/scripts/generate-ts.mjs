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
  exports.push(`export * from './${base}';`);
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

// Generate a thin typed client and methods mapping, driven by manifest.yaml
const methodImports = [];
const methodTypeEntries = [];
const wrapperFns = [];

for (const m of methods) {
  const name = m?.name;
  const cap = m?.capability;
  const argsSchema = m?.argsSchema;
  const responseSchema = m?.responseSchema;
  if (!name || !argsSchema || !responseSchema) continue;

  const argsBase = schemaBaseFromPath(argsSchema);
  const respBase = schemaBaseFromPath(responseSchema);
  const argsType = typeNameFromSchemaBase(argsBase);
  const respType = typeNameFromSchemaBase(respBase);

  methodImports.push(`import type { ${argsType} } from './${argsBase}';`);
  methodImports.push(`import type { ${respType} } from './${respBase}';`);

  methodTypeEntries.push(
    `  '${name}': { args: ${argsType}; response: ${respType}; capability: '${cap}' }`,
  );

  const fnName = pascalCase(name.replace('/', '_'))
    .replace(/_+/g, '')
    .replace(/\W+/g, '');
  wrapperFns.push(
    `export const ${fnName} = (client: JmapApiClient, args: ${argsType}) => client.call('${name}', args);`,
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
`    this.fetchImpl = config.fetch ?? fetch;\n` +
`  }\n\n` +
`  async call<K extends keyof M & string>(name: K, args: M[K]['args']): Promise<M[K]['response']> {\n` +
`    const callId = String(++this.callSeq);\n` +
`    const body: JmapRequestBody = { using: this.using, methodCalls: [[name, args, callId]] };\n` +
`    const res = await this.post(body);\n` +
`    const match = res.methodResponses.find((r) => r[2] === callId);\n` +
`    if (!match) throw new Error('Missing JMAP response for callId ' + callId);\n` +
`    return match[1] as M[K]['response'];\n` +
`  }\n\n` +
`  async batch(calls: Array<{ name: keyof M & string; args: unknown }>): Promise<JmapResponseBody> {\n` +
`    const methodCalls: MethodCall[] = calls.map((c) => [c.name, c.args, String(++this.callSeq)]);\n` +
`    return this.post({ using: this.using, methodCalls });\n` +
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

const uniq = (arr) => [...new Set(arr)];
const methodsTs = `/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */\n\n` +
  `${uniq(methodImports).join('\n')}\n` +
  `\nimport { JmapClient } from './client';\n\n` +
  `export const defaultUsing = ${JSON.stringify(capabilities, null, 2)} as const;\n\n` +
  `export type Methods = {\n${methodTypeEntries.join(',\n')}\n};\n\n` +
  `export type JmapApiClient = JmapClient<Methods>;\n\n` +
  `export const createClient = (config: Omit<import('./client').JmapClientConfig, 'using'> & { using?: readonly string[] }) =>\n` +
  `  new JmapClient<Methods>({ ...config, using: config.using ?? defaultUsing });\n\n` +
  `${wrapperFns.join('\n')}\n`;

await fs.writeFile(path.join(outDir, 'methods.ts'), methodsTs, 'utf8');

exports.push(`export * from './client';`);
exports.push(`export * from './methods';`);

await fs.writeFile(path.join(outDir, 'index.ts'), exports.join('\n') + '\n', 'utf8');
