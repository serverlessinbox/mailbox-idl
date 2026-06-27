/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */

import { onMethodError, onHttpError } from '../validationHandler';

export type MethodCall = [name: string, args: unknown, callId: string];
export type MethodResponse = [name: string, response: unknown, callId: string];

export interface JmapRequestBody {
  using: readonly string[];
  methodCalls: MethodCall[];
}

export interface JmapResponseBody {
  methodResponses: MethodResponse[];
  sessionState?: string;
}

export type MethodsMap = Record<string, { args: unknown; response: unknown }>;

export interface JmapClientConfig {
  apiUrl: string;
  using: readonly string[];
  authorization?: string;
  fetch?: typeof fetch;
}

export class JmapClient<M extends MethodsMap> {
  private readonly apiUrl: string;
  private readonly using: readonly string[];
  private readonly authorization?: string;
  private readonly fetchImpl: typeof fetch;
  private callSeq = 0;

  constructor(config: JmapClientConfig) {
    this.apiUrl = config.apiUrl;
    this.using = config.using;
    this.authorization = config.authorization;
    this.fetchImpl = ((config.fetch ?? globalThis.fetch) as typeof fetch).bind(globalThis);
  }

  nextCallId(): string {
    return String(++this.callSeq);
  }

  async request(methodCalls: MethodCall[]): Promise<JmapResponseBody> {
    return this.post({ using: this.using, methodCalls });
  }

  async call<K extends keyof M & string>(name: K, args: M[K]['args']): Promise<M[K]['response']> {
    const callId = this.nextCallId();
    const body: JmapRequestBody = { using: this.using, methodCalls: [[name, args, callId]] };
    const res = await this.post(body);
    const match = res.methodResponses.find((r) => r[2] === callId);
    if (!match) throw new Error('Missing JMAP response for callId ' + callId);
    if (match[0] === 'error') onMethodError(name, match[1]);
    return match[1] as M[K]['response'];
  }

  async batch(calls: Array<{ name: keyof M & string; args: unknown }>): Promise<JmapResponseBody> {
    const methodCalls: MethodCall[] = calls.map((c) => [c.name, c.args, this.nextCallId()]);
    return this.request(methodCalls);
  }

  private async post(body: JmapRequestBody): Promise<JmapResponseBody> {
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    if (this.authorization) headers['authorization'] = this.authorization;
    const resp = await this.fetchImpl(this.apiUrl, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      const methods = body.methodCalls.map((c) => String(c[0]));
      onHttpError(resp.status, methods, text);
      throw new Error('JMAP HTTP ' + resp.status + ': ' + text);
    }
    return (await resp.json()) as JmapResponseBody;
  }
}
