/** The rendered pieces that make up methods.ts. */
export interface MethodsFileParts {
  readonly typeImportLines: readonly string[];
  readonly hasAcceptedRefs: boolean;
  readonly capabilities: readonly string[];
  readonly methodTypeEntries: readonly string[];
  readonly provideMappingLines: readonly string[];
  readonly dxArgsTypes: readonly string[];
  readonly wrapperFunctions: readonly string[];
}

/**
 * Every text fragment the TypeScript generator writes: file headers, the
 * fixed runtime files and the line templates that the emitters fill in.
 */
export class TsTemplates {
  /** Banner passed to json-schema-to-typescript for the per-schema type files. */
  public readonly schemaBanner = '/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */';

  private readonly manifestBanner = '/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */';

  /** Contents of client.ts. */
  public clientFile(): string {
    return [
      this.manifestBanner,
      '',
      "import { onMethodError, onHttpError } from '../validationHandler';",
      '',
      'export type MethodCall = [name: string, args: unknown, callId: string];',
      'export type MethodResponse = [name: string, response: unknown, callId: string];',
      '',
      'export interface JmapRequestBody {',
      '  using: readonly string[];',
      '  methodCalls: MethodCall[];',
      '}',
      '',
      'export interface JmapResponseBody {',
      '  methodResponses: MethodResponse[];',
      '  sessionState?: string;',
      '}',
      '',
      'export type MethodsMap = Record<string, { args: unknown; response: unknown }>;',
      '',
      '/** Shape of a JMAP method-level error object, per RFC 8620 §3.5.1. */',
      'export interface JmapErrorPayload {',
      '  readonly type: string;',
      '  readonly description?: string;',
      '  readonly [key: string]: unknown;',
      '}',
      '',
      '/**',
      ' * Thrown by `JmapClient.call()` when the server returns a JMAP method error',
      ' * instead of a success response. A method error must never be returned to a',
      ' * caller typed as a success response (RFC 8620 §3.5.1) — callers must catch',
      ' * this (or let it propagate to a caller that does, e.g. React Query) rather',
      ' * than relying on a silent pass-through.',
      ' */',
      'export class JmapMethodCallError extends Error {',
      '  readonly methodName: string;',
      '  readonly jmapError: JmapErrorPayload;',
      '',
      '  constructor(methodName: string, jmapError: JmapErrorPayload) {',
      '    super(',
      '      `JMAP method error for ${methodName}: ${jmapError.type}` +',
      "        (jmapError.description ? ` — ${jmapError.description}` : ''),",
      '    );',
      "    this.name = 'JmapMethodCallError';",
      '    this.methodName = methodName;',
      '    this.jmapError = jmapError;',
      '  }',
      '}',
      '',
      'export interface JmapClientConfig {',
      '  apiUrl: string;',
      '  using: readonly string[];',
      '  authorization?: string;',
      '  fetch?: typeof fetch;',
      '}',
      '',
      'export class JmapClient<M extends MethodsMap> {',
      '  private readonly apiUrl: string;',
      '  private readonly using: readonly string[];',
      '  private readonly authorization?: string;',
      '  private readonly fetchImpl: typeof fetch;',
      '  private callSeq = 0;',
      '',
      '  constructor(config: JmapClientConfig) {',
      '    this.apiUrl = config.apiUrl;',
      '    this.using = config.using;',
      '    this.authorization = config.authorization;',
      '    this.fetchImpl = ((config.fetch ?? globalThis.fetch) as typeof fetch).bind(globalThis);',
      '  }',
      '',
      '  nextCallId(): string {',
      '    return String(++this.callSeq);',
      '  }',
      '',
      '  async request(methodCalls: MethodCall[]): Promise<JmapResponseBody> {',
      '    return this.post({ using: this.using, methodCalls });',
      '  }',
      '',
      "  async call<K extends keyof M & string>(name: K, args: M[K]['args']): Promise<M[K]['response']> {",
      '    const callId = this.nextCallId();',
      '    const body: JmapRequestBody = { using: this.using, methodCalls: [[name, args, callId]] };',
      '    const res = await this.post(body);',
      '    const match = res.methodResponses.find((r) => r[2] === callId);',
      "    if (!match) throw new Error('Missing JMAP response for callId ' + callId);",
      "    if (match[0] === 'error') {",
      '      const error = match[1] as JmapErrorPayload;',
      '      onMethodError(name, error);',
      '      throw new JmapMethodCallError(name, error);',
      '    }',
      "    return match[1] as M[K]['response'];",
      '  }',
      '',
      '  async batch(calls: Array<{ name: keyof M & string; args: unknown }>): Promise<JmapResponseBody> {',
      '    const methodCalls: MethodCall[] = calls.map((c) => [c.name, c.args, this.nextCallId()]);',
      '    return this.request(methodCalls);',
      '  }',
      '',
      '  private async post(body: JmapRequestBody): Promise<JmapResponseBody> {',
      "    const headers: Record<string, string> = { 'content-type': 'application/json' };",
      "    if (this.authorization) headers['authorization'] = this.authorization;",
      "    const resp = await this.fetchImpl(this.apiUrl, { method: 'POST', headers, body: JSON.stringify(body) });",
      '    if (!resp.ok) {',
      "      const text = await resp.text().catch(() => '');",
      '      const methods = body.methodCalls.map((c) => String(c[0]));',
      '      onHttpError(resp.status, methods, text);',
      "      throw new Error('JMAP HTTP ' + resp.status + ': ' + text);",
      '    }',
      '    return (await resp.json()) as JmapResponseBody;',
      '  }',
      '}',
      '',
    ].join('\n');
  }

  /** Contents of session.ts. */
  public sessionFile(): string {
    return [
      this.manifestBanner,
      '',
      'export type JmapCapabilityName = string;',
      '',
      'export type JmapSessionCapabilities = Record<JmapCapabilityName, unknown>;',
      '',
      'export type JmapAccountCapabilities = Record<JmapCapabilityName, unknown>;',
      '',
      'export type JmapSessionAccount = Readonly<{',
      '  name?: string;',
      '  isPersonal?: boolean;',
      '  isReadOnly?: boolean;',
      '  accountCapabilities?: JmapAccountCapabilities;',
      '}>;',
      '',
      'export type JmapSessionResource = Readonly<{',
      '  capabilities: JmapSessionCapabilities;',
      '  accounts: Record<string, JmapSessionAccount>;',
      '  primaryAccounts?: Record<string, string>;',
      '  username?: string;',
      '  apiUrl: string;',
      '  downloadUrl?: string;',
      '  uploadUrl?: string;',
      '  eventSourceUrl?: string;',
      '  state: string;',
      '}>;',
      '',
      'export class JmapSessionError extends Error {',
      '  readonly status: number;',
      '  readonly bodyText: string;',
      '',
      '  constructor(message: string, status: number, bodyText: string) {',
      '    super(message);',
      "    this.name = 'JmapSessionError';",
      '    this.status = status;',
      '    this.bodyText = bodyText;',
      '  }',
      '}',
      '',
      'export type GetJmapSessionConfig = Readonly<{',
      '  baseUrl: string;',
      '  authorization?: string;',
      '  fetch?: typeof fetch;',
      '  wellKnownPath?: string;',
      '  credentials?: RequestCredentials;',
      '  signal?: AbortSignal;',
      '}>;',
      '',
      'function joinUrl(baseUrl: string, path: string): string {',
      "  const b = baseUrl.replace(/\\/+$/, '');",
      "  const p = path.startsWith('/') ? path : '/' + path;",
      '  return b + p;',
      '}',
      '',
      'export async function getJmapSession(config: GetJmapSessionConfig): Promise<JmapSessionResource> {',
      '  const fetchImpl = ((config.fetch ?? globalThis.fetch) as typeof fetch).bind(globalThis);',
      "  const url = joinUrl(config.baseUrl, config.wellKnownPath ?? '/.well-known/jmap');",
      "  const headers: Record<string, string> = { accept: 'application/json' };",
      "  if (config.authorization) headers['authorization'] = config.authorization;",
      '',
      "  const res = await fetchImpl(url, { method: 'GET', headers, credentials: config.credentials, signal: config.signal });",
      '  if (!res.ok) {',
      "    const bodyText = await res.text().catch(() => '');",
      "    throw new JmapSessionError('Failed to fetch JMAP session (' + res.status + ')', res.status, bodyText);",
      '  }',
      '  return (await res.json()) as JmapSessionResource;',
      '}',
      '',
    ].join('\n');
  }

  /** Contents of refs.ts. */
  public refsFile(): string {
    return [
      this.manifestBanner,
      '',
      'export type ResultRef<M extends string = string, P extends string = string> = Readonly<{',
      '  resultOf: string;',
      '  name: M;',
      '  path: P;',
      '}>;',
      '',
      'export const resultRef = <M extends string, P extends string>(resultOf: string, name: M, path: P): ResultRef<M, P> => ({',
      '  resultOf,',
      '  name,',
      '  path,',
      '});',
      '',
    ].join('\n');
  }

  /** Contents of one `<response>.validator.ts` wrapping AJV standalone code; `functionName` is null when AJV emitted no recognizable function. */
  public validatorFile(standaloneCode: string, functionName: string | null): string {
    const validateResponse =
      functionName === null
        ? 'export function validateResponse(_data: unknown): boolean { return true; }\n'
        : `export function validateResponse(data: unknown): boolean { const ok = ${functionName}(data); validateResponse.errors = ${functionName}.errors; return ok; }\n`;
    return (
      '/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */\n' +
      '/* eslint-disable */\n' +
      '// @ts-nocheck\n' +
      '// AJV standalone validator — compiled at code generation time, no runtime AJV dependency.\n\n' +
      standaloneCode +
      '\n\n' +
      validateResponse
    );
  }

  /** The import line of validators.ts for one response validator. */
  public validatorImportLine(responseBase: string, alias: string): string {
    return `import { validateResponse as ${alias} } from './${responseBase}.validator';`;
  }

  /** The `responseValidators` map entry for one method. */
  public validatorMapEntry(methodName: string, alias: string): string {
    return `  ${JSON.stringify(methodName)}: ${alias}`;
  }

  /** Contents of validators.ts. */
  public validatorsFile(importLines: readonly string[], mapEntries: readonly string[]): string {
    return (
      '/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */\n\n' +
      importLines.join('\n') +
      '\n\n' +
      'export const responseValidators: Record<string, (data: unknown) => boolean> = {\n' +
      mapEntries.join(',\n') +
      '\n' +
      '};\n'
    );
  }

  /** The `import type` line for one generated schema type. */
  public typeImportLine(typeName: string, schemaBase: string): string {
    return `import type { ${typeName} } from './${schemaBase}';`;
  }

  /** The `Methods` map entry of one method. */
  public methodTypeEntry(methodName: string, argsTypeName: string, responseTypeName: string, capability: string): string {
    return `  '${methodName}': { args: ${argsTypeName}; response: ${responseTypeName}; capability: '${capability}' }`;
  }

  /** The exported one-line wrapper function of one method. */
  public wrapperFunction(functionName: string, methodName: string, argsTypeName: string): string {
    return `export const ${functionName} = (client: JmapApiClient, args: ${argsTypeName}) => client.call('${methodName}', args);`;
  }

  /** The `JmapBatch` method of one method, ending in a newline. */
  public batchMethod(functionName: string, methodName: string): string {
    return (
      `  ${functionName}(args: Methods['${methodName}']['args']): CallHandle<'${methodName}'> {\n` +
      `    return this.call('${methodName}', args);\n` +
      '  }\n'
    );
  }

  /** One `DxProvidePathsByMethod` line: the method name mapped to the union of its provided paths. */
  public provideMappingLine(methodName: string, paths: readonly string[]): string {
    return `  '${methodName}': ${paths.map((p) => `'${p}'`).join(' | ')}`;
  }

  /** One variant of a `…Dx` args type, replacing `targetProp` with a result reference. */
  public dxVariant(argsTypeName: string, targetProp: string, argKey: string, sourceMethod: string, sourceResponsePath: string): string {
    return `  | (Omit<${argsTypeName}, '${targetProp}'> & { '${argKey}': ResultRef<'${sourceMethod}', '${sourceResponsePath}'>; ${targetProp}?: never })`;
  }

  /** The declaration of a `…Dx` args type from its variants, ending in a newline. */
  public dxArgsType(dxTypeName: string, argsTypeName: string, variants: readonly string[]): string {
    return `export type ${dxTypeName} =\n` + `  | ${argsTypeName}\n` + `${variants.join('\n')};\n`;
  }

  /** Contents of methods.ts. */
  public methodsFile(parts: MethodsFileParts): string {
    return (
      `${this.manifestBanner}\n\n` +
      `${parts.typeImportLines.join('\n')}\n` +
      (parts.hasAcceptedRefs ? "import type { ResultRef } from './refs';\n" : '') +
      "\nimport { JmapClient } from './client';\n\n" +
      `export const defaultUsing = ${JSON.stringify(parts.capabilities, null, 2)} as const;\n\n` +
      `export type Methods = {\n${parts.methodTypeEntries.join(',\n')}\n};\n\n` +
      'export type JmapApiClient = JmapClient<Methods>;\n\n' +
      "export const createClient = (config: Omit<import('./client').JmapClientConfig, 'using'> & { using?: readonly string[] }) =>\n" +
      '  new JmapClient<Methods>({ ...config, using: config.using ?? defaultUsing });\n\n' +
      (parts.provideMappingLines.length > 0
        ? `export type DxProvidePathsByMethod = {\n${parts.provideMappingLines.join(',\n')}\n};\n\n`
        : 'export type DxProvidePathsByMethod = {};\n\n') +
      (parts.dxArgsTypes.length > 0 ? `${parts.dxArgsTypes.join('\n')}\n` : '') +
      `${parts.wrapperFunctions.join('\n')}\n`
    );
  }

  /** Contents of batch.ts; `batchMethods` are the already-rendered `JmapBatch` methods. */
  public batchFile(batchMethods: readonly string[]): string {
    return [
      this.manifestBanner,
      '',
      "import type { MethodCall, MethodResponse, JmapResponseBody, JmapClient } from './client';",
      "import type { Methods, DxProvidePathsByMethod } from './methods';",
      "import type { ResultRef } from './refs';",
      "import { responseValidators } from './validators';",
      "import { onValidationFailure, onMethodError } from '../validationHandler';",
      '',
      "export type CallHandle<K extends keyof Methods & string> = Readonly<{",
      '  name: K;',
      '  callId: string;',
      '}>;',
      '',
      'export type DxProvidePath<K extends keyof Methods & string> =',
      '  K extends keyof DxProvidePathsByMethod ? DxProvidePathsByMethod[K] : never;',
      '',
      'export type JmapMethodError = Readonly<{',
      '  type: string;',
      '  description?: string;',
      '  [k: string]: unknown;',
      '}>;',
      '',
      "export type CallResult<K extends keyof Methods & string> =",
      "  | { ok: true; value: Methods[K]['response'] }",
      '  | { ok: false; error: JmapMethodError };',
      '',
      'export class JmapBatchResult {',
      '  private readonly byCallId: Map<string, MethodResponse>;',
      '',
      '  constructor(response: JmapResponseBody) {',
      '    this.byCallId = new Map(response.methodResponses.map((r) => [r[2], r]));',
      '  }',
      '',
      '  get<K extends keyof Methods & string>(handle: CallHandle<K>): CallResult<K> {',
      '    const row = this.byCallId.get(handle.callId);',
      "    if (!row) { const err = { type: 'missingMethodResponse', description: 'Missing response for callId ' + handle.callId }; onMethodError(handle.name, err); return { ok: false, error: err }; }",
      '    const [name, payload] = row;',
      "    if (name === 'error') { onMethodError(handle.name, payload); return { ok: false, error: payload as JmapMethodError }; }",
      '    const validator = responseValidators[handle.name];',
      '    if (validator && !validator(payload)) {',
      '      onValidationFailure(handle.name, { errors: (validator as { errors?: unknown }).errors, payload });',
      '    }',
      "    return { ok: true, value: payload as Methods[K]['response'] };",
      '  }',
      '}',
      '',
      'export class JmapBatch {',
      '  private readonly calls: MethodCall[] = [];',
      '',
      '  private readonly client: JmapClient<Methods>;',
      '',
      '  constructor(client: JmapClient<Methods>) {',
      '    this.client = client;',
      '  }',
      '',
      "  call<K extends keyof Methods & string>(name: K, args: Methods[K]['args']): CallHandle<K> {",
      '    const callId = this.client.nextCallId();',
      '    this.calls.push([name, args, callId]);',
      '    return { name, callId };',
      '  }',
      '',
      `${batchMethods.join('\n')}  ref<K extends keyof Methods & string>(handle: CallHandle<K>, path: DxProvidePath<K>): ResultRef<K, DxProvidePath<K>> {`,
      '    return { resultOf: handle.callId, name: handle.name, path };',
      '  }',
      '',
      '  async execute(): Promise<JmapBatchResult> {',
      '    const res = await this.client.request(this.calls);',
      '    return new JmapBatchResult(res);',
      '  }',
      '}',
      '',
      'export const createBatch = (client: JmapClient<Methods>) => new JmapBatch(client);',
      '',
    ].join('\n');
  }

  /** The `export type { … }` line of index.ts for one generated schema type. */
  public typeExportLine(typeName: string, schemaBase: string): string {
    return `export type { ${typeName} } from './${schemaBase}';`;
  }

  /** The `export *` lines of index.ts that re-export the hand-composed modules. */
  public moduleExportLines(): string[] {
    return [
      "export * from './client';",
      "export * from './session';",
      "export * from './refs';",
      "export * from './methods';",
      "export * from './batch';",
    ];
  }
}
