/* Code generated from mailbox-idl/jmap manifest. DO NOT EDIT. */

import type { MailboxGetArgs } from './Mailbox.get.args';
import type { MailboxGetResponse } from './Mailbox.get.response';
import type { MailboxChangesArgs } from './Mailbox.changes.args';
import type { MailboxChangesResponse } from './Mailbox.changes.response';
import type { EmailGetArgs } from './Email.get.args';
import type { EmailGetResponse } from './Email.get.response';
import type { EmailChangesArgs } from './Email.changes.args';
import type { EmailChangesResponse } from './Email.changes.response';
import type { EmailQueryArgs } from './Email.query.args';
import type { EmailQueryResponse } from './Email.query.response';
import type { EmailQueryChangesArgs } from './Email.queryChanges.args';
import type { EmailQueryChangesResponse } from './Email.queryChanges.response';
import type { EmailSetArgs } from './Email.set.args';
import type { EmailSetResponse } from './Email.set.response';
import type { ThreadGetArgs } from './Thread.get.args';
import type { ThreadGetResponse } from './Thread.get.response';
import type { MailboxSetArgs } from './Mailbox.set.args';
import type { MailboxSetResponse } from './Mailbox.set.response';
import type { MailboxQueryArgs } from './Mailbox.query.args';
import type { MailboxQueryResponse } from './Mailbox.query.response';
import type { EmailImportArgs } from './Email.import.args';
import type { EmailImportResponse } from './Email.import.response';
import type { EmailCopyArgs } from './Email.copy.args';
import type { EmailCopyResponse } from './Email.copy.response';
import type { EmailParseArgs } from './Email.parse.args';
import type { EmailParseResponse } from './Email.parse.response';
import type { ThreadQueryArgs } from './Thread.query.args';
import type { ThreadQueryResponse } from './Thread.query.response';
import type { ThreadChangesArgs } from './Thread.changes.args';
import type { ThreadChangesResponse } from './Thread.changes.response';
import type { EmailSubmissionGetArgs } from './EmailSubmission.get.args';
import type { EmailSubmissionGetResponse } from './EmailSubmission.get.response';
import type { EmailSubmissionSetArgs } from './EmailSubmission.set.args';
import type { EmailSubmissionSetResponse } from './EmailSubmission.set.response';
import type { EmailSubmissionQueryArgs } from './EmailSubmission.query.args';
import type { EmailSubmissionQueryResponse } from './EmailSubmission.query.response';
import type { EmailSubmissionQueryChangesArgs } from './EmailSubmission.queryChanges.args';
import type { EmailSubmissionQueryChangesResponse } from './EmailSubmission.queryChanges.response';
import type { EmailSubmissionChangesArgs } from './EmailSubmission.changes.args';
import type { EmailSubmissionChangesResponse } from './EmailSubmission.changes.response';
import type { IdentityGetArgs } from './Identity.get.args';
import type { IdentityGetResponse } from './Identity.get.response';
import type { IdentitySetArgs } from './Identity.set.args';
import type { IdentitySetResponse } from './Identity.set.response';
import type { IdentityChangesArgs } from './Identity.changes.args';
import type { IdentityChangesResponse } from './Identity.changes.response';
import type { MailboxQueryChangesArgs } from './Mailbox.queryChanges.args';
import type { MailboxQueryChangesResponse } from './Mailbox.queryChanges.response';
import type { ThreadQueryChangesArgs } from './Thread.queryChanges.args';
import type { ThreadQueryChangesResponse } from './Thread.queryChanges.response';
import type { AddressBookGetArgs } from './AddressBook.get.args';
import type { AddressBookGetResponse } from './AddressBook.get.response';
import type { AddressBookSetArgs } from './AddressBook.set.args';
import type { AddressBookSetResponse } from './AddressBook.set.response';
import type { AddressBookQueryArgs } from './AddressBook.query.args';
import type { AddressBookQueryResponse } from './AddressBook.query.response';
import type { AddressBookQueryChangesArgs } from './AddressBook.queryChanges.args';
import type { AddressBookQueryChangesResponse } from './AddressBook.queryChanges.response';
import type { AddressBookChangesArgs } from './AddressBook.changes.args';
import type { AddressBookChangesResponse } from './AddressBook.changes.response';
import type { ContactCardGetArgs } from './ContactCard.get.args';
import type { ContactCardGetResponse } from './ContactCard.get.response';
import type { ContactCardSetArgs } from './ContactCard.set.args';
import type { ContactCardSetResponse } from './ContactCard.set.response';
import type { ContactCardQueryArgs } from './ContactCard.query.args';
import type { ContactCardQueryResponse } from './ContactCard.query.response';
import type { ContactCardQueryChangesArgs } from './ContactCard.queryChanges.args';
import type { ContactCardQueryChangesResponse } from './ContactCard.queryChanges.response';
import type { ContactCardChangesArgs } from './ContactCard.changes.args';
import type { ContactCardChangesResponse } from './ContactCard.changes.response';
import type { ContactCardCopyArgs } from './ContactCard.copy.args';
import type { ContactCardCopyResponse } from './ContactCard.copy.response';
import type { PrincipalGetArgs } from './Principal.get.args';
import type { PrincipalGetResponse } from './Principal.get.response';
import type { PrincipalSetArgs } from './Principal.set.args';
import type { PrincipalSetResponse } from './Principal.set.response';
import type { PrincipalQueryArgs } from './Principal.query.args';
import type { PrincipalQueryResponse } from './Principal.query.response';
import type { PrincipalQueryChangesArgs } from './Principal.queryChanges.args';
import type { PrincipalQueryChangesResponse } from './Principal.queryChanges.response';
import type { PrincipalChangesArgs } from './Principal.changes.args';
import type { PrincipalChangesResponse } from './Principal.changes.response';
import type { ShareNotificationGetArgs } from './ShareNotification.get.args';
import type { ShareNotificationGetResponse } from './ShareNotification.get.response';
import type { ShareNotificationSetArgs } from './ShareNotification.set.args';
import type { ShareNotificationSetResponse } from './ShareNotification.set.response';
import type { ShareNotificationQueryArgs } from './ShareNotification.query.args';
import type { ShareNotificationQueryResponse } from './ShareNotification.query.response';
import type { ShareNotificationQueryChangesArgs } from './ShareNotification.queryChanges.args';
import type { ShareNotificationQueryChangesResponse } from './ShareNotification.queryChanges.response';
import type { ShareNotificationChangesArgs } from './ShareNotification.changes.args';
import type { ShareNotificationChangesResponse } from './ShareNotification.changes.response';
import type { ResultRef } from './refs';

import { JmapClient } from './client';

export const defaultUsing = [
  "urn:ietf:params:jmap:core",
  "urn:ietf:params:jmap:mail",
  "urn:ietf:params:jmap:submission",
  "urn:ietf:params:jmap:contacts",
  "urn:ietf:params:jmap:principals",
  "https://specs.serverlessinbox.com/page-token",
  "https://specs.serverlessinbox.com/websocket"
] as const;

export type Methods = {
  'Mailbox/get': { args: MailboxGetArgs; response: MailboxGetResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Mailbox/changes': { args: MailboxChangesArgs; response: MailboxChangesResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/get': { args: EmailGetArgsDx; response: EmailGetResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/changes': { args: EmailChangesArgs; response: EmailChangesResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/query': { args: EmailQueryArgs; response: EmailQueryResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/queryChanges': { args: EmailQueryChangesArgs; response: EmailQueryChangesResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/set': { args: EmailSetArgs; response: EmailSetResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Thread/get': { args: ThreadGetArgs; response: ThreadGetResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Mailbox/set': { args: MailboxSetArgs; response: MailboxSetResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Mailbox/query': { args: MailboxQueryArgs; response: MailboxQueryResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/import': { args: EmailImportArgs; response: EmailImportResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/copy': { args: EmailCopyArgs; response: EmailCopyResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Email/parse': { args: EmailParseArgs; response: EmailParseResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Thread/query': { args: ThreadQueryArgs; response: ThreadQueryResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Thread/changes': { args: ThreadChangesArgs; response: ThreadChangesResponse; capability: 'urn:ietf:params:jmap:mail' },
  'EmailSubmission/get': { args: EmailSubmissionGetArgs; response: EmailSubmissionGetResponse; capability: 'urn:ietf:params:jmap:submission' },
  'EmailSubmission/set': { args: EmailSubmissionSetArgs; response: EmailSubmissionSetResponse; capability: 'urn:ietf:params:jmap:submission' },
  'EmailSubmission/query': { args: EmailSubmissionQueryArgs; response: EmailSubmissionQueryResponse; capability: 'urn:ietf:params:jmap:submission' },
  'EmailSubmission/queryChanges': { args: EmailSubmissionQueryChangesArgs; response: EmailSubmissionQueryChangesResponse; capability: 'urn:ietf:params:jmap:submission' },
  'EmailSubmission/changes': { args: EmailSubmissionChangesArgs; response: EmailSubmissionChangesResponse; capability: 'urn:ietf:params:jmap:submission' },
  'Identity/get': { args: IdentityGetArgs; response: IdentityGetResponse; capability: 'urn:ietf:params:jmap:submission' },
  'Identity/set': { args: IdentitySetArgs; response: IdentitySetResponse; capability: 'urn:ietf:params:jmap:submission' },
  'Identity/changes': { args: IdentityChangesArgs; response: IdentityChangesResponse; capability: 'urn:ietf:params:jmap:submission' },
  'Mailbox/queryChanges': { args: MailboxQueryChangesArgs; response: MailboxQueryChangesResponse; capability: 'urn:ietf:params:jmap:mail' },
  'Thread/queryChanges': { args: ThreadQueryChangesArgs; response: ThreadQueryChangesResponse; capability: 'urn:ietf:params:jmap:mail' },
  'AddressBook/get': { args: AddressBookGetArgs; response: AddressBookGetResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'AddressBook/set': { args: AddressBookSetArgs; response: AddressBookSetResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'AddressBook/query': { args: AddressBookQueryArgs; response: AddressBookQueryResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'AddressBook/queryChanges': { args: AddressBookQueryChangesArgs; response: AddressBookQueryChangesResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'AddressBook/changes': { args: AddressBookChangesArgs; response: AddressBookChangesResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'ContactCard/get': { args: ContactCardGetArgsDx; response: ContactCardGetResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'ContactCard/set': { args: ContactCardSetArgs; response: ContactCardSetResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'ContactCard/query': { args: ContactCardQueryArgs; response: ContactCardQueryResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'ContactCard/queryChanges': { args: ContactCardQueryChangesArgs; response: ContactCardQueryChangesResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'ContactCard/changes': { args: ContactCardChangesArgs; response: ContactCardChangesResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'ContactCard/copy': { args: ContactCardCopyArgs; response: ContactCardCopyResponse; capability: 'urn:ietf:params:jmap:contacts' },
  'Principal/get': { args: PrincipalGetArgs; response: PrincipalGetResponse; capability: 'urn:ietf:params:jmap:principals' },
  'Principal/set': { args: PrincipalSetArgs; response: PrincipalSetResponse; capability: 'urn:ietf:params:jmap:principals' },
  'Principal/query': { args: PrincipalQueryArgs; response: PrincipalQueryResponse; capability: 'urn:ietf:params:jmap:principals' },
  'Principal/queryChanges': { args: PrincipalQueryChangesArgs; response: PrincipalQueryChangesResponse; capability: 'urn:ietf:params:jmap:principals' },
  'Principal/changes': { args: PrincipalChangesArgs; response: PrincipalChangesResponse; capability: 'urn:ietf:params:jmap:principals' },
  'ShareNotification/get': { args: ShareNotificationGetArgs; response: ShareNotificationGetResponse; capability: 'urn:ietf:params:jmap:principals' },
  'ShareNotification/set': { args: ShareNotificationSetArgs; response: ShareNotificationSetResponse; capability: 'urn:ietf:params:jmap:principals' },
  'ShareNotification/query': { args: ShareNotificationQueryArgs; response: ShareNotificationQueryResponse; capability: 'urn:ietf:params:jmap:principals' },
  'ShareNotification/queryChanges': { args: ShareNotificationQueryChangesArgs; response: ShareNotificationQueryChangesResponse; capability: 'urn:ietf:params:jmap:principals' },
  'ShareNotification/changes': { args: ShareNotificationChangesArgs; response: ShareNotificationChangesResponse; capability: 'urn:ietf:params:jmap:principals' }
};

export type JmapApiClient = JmapClient<Methods>;

export const createClient = (config: Omit<import('./client').JmapClientConfig, 'using'> & { using?: readonly string[] }) =>
  new JmapClient<Methods>({ ...config, using: config.using ?? defaultUsing });

export type DxProvidePathsByMethod = {
  'Email/query': '/ids',
  'ContactCard/query': '/ids'
};

export type EmailGetArgsDx =
  | EmailGetArgs
  | (Omit<EmailGetArgs, 'ids'> & { '#ids': ResultRef<'Email/query', '/ids'>; ids?: never });

export type ContactCardGetArgsDx =
  | ContactCardGetArgs
  | (Omit<ContactCardGetArgs, 'ids'> & { '#ids': ResultRef<'ContactCard/query', '/ids'>; ids?: never });

export const MailboxGet = (client: JmapApiClient, args: MailboxGetArgs) => client.call('Mailbox/get', args);
export const MailboxChanges = (client: JmapApiClient, args: MailboxChangesArgs) => client.call('Mailbox/changes', args);
export const EmailGet = (client: JmapApiClient, args: EmailGetArgsDx) => client.call('Email/get', args);
export const EmailChanges = (client: JmapApiClient, args: EmailChangesArgs) => client.call('Email/changes', args);
export const EmailQuery = (client: JmapApiClient, args: EmailQueryArgs) => client.call('Email/query', args);
export const EmailQueryChanges = (client: JmapApiClient, args: EmailQueryChangesArgs) => client.call('Email/queryChanges', args);
export const EmailSet = (client: JmapApiClient, args: EmailSetArgs) => client.call('Email/set', args);
export const ThreadGet = (client: JmapApiClient, args: ThreadGetArgs) => client.call('Thread/get', args);
export const MailboxSet = (client: JmapApiClient, args: MailboxSetArgs) => client.call('Mailbox/set', args);
export const MailboxQuery = (client: JmapApiClient, args: MailboxQueryArgs) => client.call('Mailbox/query', args);
export const EmailImport = (client: JmapApiClient, args: EmailImportArgs) => client.call('Email/import', args);
export const EmailCopy = (client: JmapApiClient, args: EmailCopyArgs) => client.call('Email/copy', args);
export const EmailParse = (client: JmapApiClient, args: EmailParseArgs) => client.call('Email/parse', args);
export const ThreadQuery = (client: JmapApiClient, args: ThreadQueryArgs) => client.call('Thread/query', args);
export const ThreadChanges = (client: JmapApiClient, args: ThreadChangesArgs) => client.call('Thread/changes', args);
export const EmailSubmissionGet = (client: JmapApiClient, args: EmailSubmissionGetArgs) => client.call('EmailSubmission/get', args);
export const EmailSubmissionSet = (client: JmapApiClient, args: EmailSubmissionSetArgs) => client.call('EmailSubmission/set', args);
export const EmailSubmissionQuery = (client: JmapApiClient, args: EmailSubmissionQueryArgs) => client.call('EmailSubmission/query', args);
export const EmailSubmissionQueryChanges = (client: JmapApiClient, args: EmailSubmissionQueryChangesArgs) => client.call('EmailSubmission/queryChanges', args);
export const EmailSubmissionChanges = (client: JmapApiClient, args: EmailSubmissionChangesArgs) => client.call('EmailSubmission/changes', args);
export const IdentityGet = (client: JmapApiClient, args: IdentityGetArgs) => client.call('Identity/get', args);
export const IdentitySet = (client: JmapApiClient, args: IdentitySetArgs) => client.call('Identity/set', args);
export const IdentityChanges = (client: JmapApiClient, args: IdentityChangesArgs) => client.call('Identity/changes', args);
export const MailboxQueryChanges = (client: JmapApiClient, args: MailboxQueryChangesArgs) => client.call('Mailbox/queryChanges', args);
export const ThreadQueryChanges = (client: JmapApiClient, args: ThreadQueryChangesArgs) => client.call('Thread/queryChanges', args);
export const AddressBookGet = (client: JmapApiClient, args: AddressBookGetArgs) => client.call('AddressBook/get', args);
export const AddressBookSet = (client: JmapApiClient, args: AddressBookSetArgs) => client.call('AddressBook/set', args);
export const AddressBookQuery = (client: JmapApiClient, args: AddressBookQueryArgs) => client.call('AddressBook/query', args);
export const AddressBookQueryChanges = (client: JmapApiClient, args: AddressBookQueryChangesArgs) => client.call('AddressBook/queryChanges', args);
export const AddressBookChanges = (client: JmapApiClient, args: AddressBookChangesArgs) => client.call('AddressBook/changes', args);
export const ContactCardGet = (client: JmapApiClient, args: ContactCardGetArgsDx) => client.call('ContactCard/get', args);
export const ContactCardSet = (client: JmapApiClient, args: ContactCardSetArgs) => client.call('ContactCard/set', args);
export const ContactCardQuery = (client: JmapApiClient, args: ContactCardQueryArgs) => client.call('ContactCard/query', args);
export const ContactCardQueryChanges = (client: JmapApiClient, args: ContactCardQueryChangesArgs) => client.call('ContactCard/queryChanges', args);
export const ContactCardChanges = (client: JmapApiClient, args: ContactCardChangesArgs) => client.call('ContactCard/changes', args);
export const ContactCardCopy = (client: JmapApiClient, args: ContactCardCopyArgs) => client.call('ContactCard/copy', args);
export const PrincipalGet = (client: JmapApiClient, args: PrincipalGetArgs) => client.call('Principal/get', args);
export const PrincipalSet = (client: JmapApiClient, args: PrincipalSetArgs) => client.call('Principal/set', args);
export const PrincipalQuery = (client: JmapApiClient, args: PrincipalQueryArgs) => client.call('Principal/query', args);
export const PrincipalQueryChanges = (client: JmapApiClient, args: PrincipalQueryChangesArgs) => client.call('Principal/queryChanges', args);
export const PrincipalChanges = (client: JmapApiClient, args: PrincipalChangesArgs) => client.call('Principal/changes', args);
export const ShareNotificationGet = (client: JmapApiClient, args: ShareNotificationGetArgs) => client.call('ShareNotification/get', args);
export const ShareNotificationSet = (client: JmapApiClient, args: ShareNotificationSetArgs) => client.call('ShareNotification/set', args);
export const ShareNotificationQuery = (client: JmapApiClient, args: ShareNotificationQueryArgs) => client.call('ShareNotification/query', args);
export const ShareNotificationQueryChanges = (client: JmapApiClient, args: ShareNotificationQueryChangesArgs) => client.call('ShareNotification/queryChanges', args);
export const ShareNotificationChanges = (client: JmapApiClient, args: ShareNotificationChangesArgs) => client.call('ShareNotification/changes', args);
