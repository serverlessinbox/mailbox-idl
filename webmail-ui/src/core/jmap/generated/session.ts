/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */

export type JmapCapabilityName = string;

export type JmapSessionCapabilities = Record<JmapCapabilityName, unknown>;

export type JmapAccountCapabilities = Record<JmapCapabilityName, unknown>;

export type JmapSessionAccount = Readonly<{
  name?: string;
  isPersonal?: boolean;
  isReadOnly?: boolean;
  accountCapabilities?: JmapAccountCapabilities;
}>;

export type JmapSessionResource = Readonly<{
  capabilities: JmapSessionCapabilities;
  accounts: Record<string, JmapSessionAccount>;
  primaryAccounts?: Record<string, string>;
  username?: string;
  apiUrl: string;
  downloadUrl?: string;
  uploadUrl?: string;
  eventSourceUrl?: string;
  state: string;
}>;

export class JmapSessionError extends Error {
  readonly status: number;
  readonly bodyText: string;

  constructor(message: string, status: number, bodyText: string) {
    super(message);
    this.name = 'JmapSessionError';
    this.status = status;
    this.bodyText = bodyText;
  }
}

export type GetJmapSessionConfig = Readonly<{
  baseUrl: string;
  authorization?: string;
  fetch?: typeof fetch;
  wellKnownPath?: string;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
}>;

function joinUrl(baseUrl: string, path: string): string {
  const b = baseUrl.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : '/' + path;
  return b + p;
}

export async function getJmapSession(config: GetJmapSessionConfig): Promise<JmapSessionResource> {
  const fetchImpl = ((config.fetch ?? globalThis.fetch) as typeof fetch).bind(globalThis);
  const url = joinUrl(config.baseUrl, config.wellKnownPath ?? '/.well-known/jmap');
  const headers: Record<string, string> = { accept: 'application/json' };
  if (config.authorization) headers['authorization'] = config.authorization;

  const res = await fetchImpl(url, { method: 'GET', headers, credentials: config.credentials, signal: config.signal });
  if (!res.ok) {
    const bodyText = await res.text().catch(() => '');
    throw new JmapSessionError('Failed to fetch JMAP session (' + res.status + ')', res.status, bodyText);
  }
  return (await res.json()) as JmapSessionResource;
}
