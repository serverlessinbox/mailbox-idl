/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */

import type { MethodCall, MethodResponse, JmapResponseBody, JmapClient } from './client';
import type { Methods, DxProvidePathsByMethod } from './methods';
import type { ResultRef } from './refs';
import { responseValidators } from './validators';
import { onValidationFailure, onMethodError } from '../validationHandler';

export type CallHandle<K extends keyof Methods & string> = Readonly<{
  name: K;
  callId: string;
}>;

export type DxProvidePath<K extends keyof Methods & string> =
  K extends keyof DxProvidePathsByMethod ? DxProvidePathsByMethod[K] : never;

export type JmapMethodError = Readonly<{
  type: string;
  description?: string;
  [k: string]: unknown;
}>;

export type CallResult<K extends keyof Methods & string> =
  | { ok: true; value: Methods[K]['response'] }
  | { ok: false; error: JmapMethodError };

export class JmapBatchResult {
  private readonly byCallId: Map<string, MethodResponse>;

  constructor(response: JmapResponseBody) {
    this.byCallId = new Map(response.methodResponses.map((r) => [r[2], r]));
  }

  get<K extends keyof Methods & string>(handle: CallHandle<K>): CallResult<K> {
    const row = this.byCallId.get(handle.callId);
    if (!row) { const err = { type: 'missingMethodResponse', description: 'Missing response for callId ' + handle.callId }; onMethodError(handle.name, err); return { ok: false, error: err }; }
    const [name, payload] = row;
    if (name === 'error') { onMethodError(handle.name, payload); return { ok: false, error: payload as JmapMethodError }; }
    const validator = responseValidators[handle.name];
    if (validator && !validator(payload)) {
      onValidationFailure(handle.name, { errors: (validator as { errors?: unknown }).errors, payload });
    }
    return { ok: true, value: payload as Methods[K]['response'] };
  }
}

export class JmapBatch {
  private readonly calls: MethodCall[] = [];

  private readonly client: JmapClient<Methods>;

  constructor(client: JmapClient<Methods>) {
    this.client = client;
  }

  call<K extends keyof Methods & string>(name: K, args: Methods[K]['args']): CallHandle<K> {
    const callId = this.client.nextCallId();
    this.calls.push([name, args, callId]);
    return { name, callId };
  }

  MailboxGet(args: Methods['Mailbox/get']['args']): CallHandle<'Mailbox/get'> {
    return this.call('Mailbox/get', args);
  }

  MailboxChanges(args: Methods['Mailbox/changes']['args']): CallHandle<'Mailbox/changes'> {
    return this.call('Mailbox/changes', args);
  }

  EmailGet(args: Methods['Email/get']['args']): CallHandle<'Email/get'> {
    return this.call('Email/get', args);
  }

  EmailChanges(args: Methods['Email/changes']['args']): CallHandle<'Email/changes'> {
    return this.call('Email/changes', args);
  }

  EmailQuery(args: Methods['Email/query']['args']): CallHandle<'Email/query'> {
    return this.call('Email/query', args);
  }

  EmailQueryChanges(args: Methods['Email/queryChanges']['args']): CallHandle<'Email/queryChanges'> {
    return this.call('Email/queryChanges', args);
  }

  EmailSet(args: Methods['Email/set']['args']): CallHandle<'Email/set'> {
    return this.call('Email/set', args);
  }

  ThreadGet(args: Methods['Thread/get']['args']): CallHandle<'Thread/get'> {
    return this.call('Thread/get', args);
  }

  MailboxSet(args: Methods['Mailbox/set']['args']): CallHandle<'Mailbox/set'> {
    return this.call('Mailbox/set', args);
  }

  MailboxQuery(args: Methods['Mailbox/query']['args']): CallHandle<'Mailbox/query'> {
    return this.call('Mailbox/query', args);
  }

  EmailImport(args: Methods['Email/import']['args']): CallHandle<'Email/import'> {
    return this.call('Email/import', args);
  }

  EmailCopy(args: Methods['Email/copy']['args']): CallHandle<'Email/copy'> {
    return this.call('Email/copy', args);
  }

  EmailParse(args: Methods['Email/parse']['args']): CallHandle<'Email/parse'> {
    return this.call('Email/parse', args);
  }

  ThreadQuery(args: Methods['Thread/query']['args']): CallHandle<'Thread/query'> {
    return this.call('Thread/query', args);
  }

  ThreadChanges(args: Methods['Thread/changes']['args']): CallHandle<'Thread/changes'> {
    return this.call('Thread/changes', args);
  }

  EmailSubmissionGet(args: Methods['EmailSubmission/get']['args']): CallHandle<'EmailSubmission/get'> {
    return this.call('EmailSubmission/get', args);
  }

  EmailSubmissionSet(args: Methods['EmailSubmission/set']['args']): CallHandle<'EmailSubmission/set'> {
    return this.call('EmailSubmission/set', args);
  }

  EmailSubmissionQuery(args: Methods['EmailSubmission/query']['args']): CallHandle<'EmailSubmission/query'> {
    return this.call('EmailSubmission/query', args);
  }

  EmailSubmissionQueryChanges(args: Methods['EmailSubmission/queryChanges']['args']): CallHandle<'EmailSubmission/queryChanges'> {
    return this.call('EmailSubmission/queryChanges', args);
  }

  EmailSubmissionChanges(args: Methods['EmailSubmission/changes']['args']): CallHandle<'EmailSubmission/changes'> {
    return this.call('EmailSubmission/changes', args);
  }

  IdentityGet(args: Methods['Identity/get']['args']): CallHandle<'Identity/get'> {
    return this.call('Identity/get', args);
  }

  IdentitySet(args: Methods['Identity/set']['args']): CallHandle<'Identity/set'> {
    return this.call('Identity/set', args);
  }

  IdentityChanges(args: Methods['Identity/changes']['args']): CallHandle<'Identity/changes'> {
    return this.call('Identity/changes', args);
  }

  MailboxQueryChanges(args: Methods['Mailbox/queryChanges']['args']): CallHandle<'Mailbox/queryChanges'> {
    return this.call('Mailbox/queryChanges', args);
  }

  ThreadQueryChanges(args: Methods['Thread/queryChanges']['args']): CallHandle<'Thread/queryChanges'> {
    return this.call('Thread/queryChanges', args);
  }

  AddressBookGet(args: Methods['AddressBook/get']['args']): CallHandle<'AddressBook/get'> {
    return this.call('AddressBook/get', args);
  }

  AddressBookSet(args: Methods['AddressBook/set']['args']): CallHandle<'AddressBook/set'> {
    return this.call('AddressBook/set', args);
  }

  AddressBookQuery(args: Methods['AddressBook/query']['args']): CallHandle<'AddressBook/query'> {
    return this.call('AddressBook/query', args);
  }

  AddressBookQueryChanges(args: Methods['AddressBook/queryChanges']['args']): CallHandle<'AddressBook/queryChanges'> {
    return this.call('AddressBook/queryChanges', args);
  }

  AddressBookChanges(args: Methods['AddressBook/changes']['args']): CallHandle<'AddressBook/changes'> {
    return this.call('AddressBook/changes', args);
  }

  ContactCardGet(args: Methods['ContactCard/get']['args']): CallHandle<'ContactCard/get'> {
    return this.call('ContactCard/get', args);
  }

  ContactCardSet(args: Methods['ContactCard/set']['args']): CallHandle<'ContactCard/set'> {
    return this.call('ContactCard/set', args);
  }

  ContactCardQuery(args: Methods['ContactCard/query']['args']): CallHandle<'ContactCard/query'> {
    return this.call('ContactCard/query', args);
  }

  ContactCardQueryChanges(args: Methods['ContactCard/queryChanges']['args']): CallHandle<'ContactCard/queryChanges'> {
    return this.call('ContactCard/queryChanges', args);
  }

  ContactCardChanges(args: Methods['ContactCard/changes']['args']): CallHandle<'ContactCard/changes'> {
    return this.call('ContactCard/changes', args);
  }

  ContactCardCopy(args: Methods['ContactCard/copy']['args']): CallHandle<'ContactCard/copy'> {
    return this.call('ContactCard/copy', args);
  }

  PrincipalGet(args: Methods['Principal/get']['args']): CallHandle<'Principal/get'> {
    return this.call('Principal/get', args);
  }

  PrincipalSet(args: Methods['Principal/set']['args']): CallHandle<'Principal/set'> {
    return this.call('Principal/set', args);
  }

  PrincipalQuery(args: Methods['Principal/query']['args']): CallHandle<'Principal/query'> {
    return this.call('Principal/query', args);
  }

  PrincipalQueryChanges(args: Methods['Principal/queryChanges']['args']): CallHandle<'Principal/queryChanges'> {
    return this.call('Principal/queryChanges', args);
  }

  PrincipalChanges(args: Methods['Principal/changes']['args']): CallHandle<'Principal/changes'> {
    return this.call('Principal/changes', args);
  }

  ShareNotificationGet(args: Methods['ShareNotification/get']['args']): CallHandle<'ShareNotification/get'> {
    return this.call('ShareNotification/get', args);
  }

  ShareNotificationSet(args: Methods['ShareNotification/set']['args']): CallHandle<'ShareNotification/set'> {
    return this.call('ShareNotification/set', args);
  }

  ShareNotificationQuery(args: Methods['ShareNotification/query']['args']): CallHandle<'ShareNotification/query'> {
    return this.call('ShareNotification/query', args);
  }

  ShareNotificationQueryChanges(args: Methods['ShareNotification/queryChanges']['args']): CallHandle<'ShareNotification/queryChanges'> {
    return this.call('ShareNotification/queryChanges', args);
  }

  ShareNotificationChanges(args: Methods['ShareNotification/changes']['args']): CallHandle<'ShareNotification/changes'> {
    return this.call('ShareNotification/changes', args);
  }
  ref<K extends keyof Methods & string>(handle: CallHandle<K>, path: DxProvidePath<K>): ResultRef<K, DxProvidePath<K>> {
    return { resultOf: handle.callId, name: handle.name, path };
  }

  async execute(): Promise<JmapBatchResult> {
    const res = await this.client.request(this.calls);
    return new JmapBatchResult(res);
  }
}

export const createBatch = (client: JmapClient<Methods>) => new JmapBatch(client);
