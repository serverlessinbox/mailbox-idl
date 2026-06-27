/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

import { validateResponse as validateMailboxGetResponse } from './Mailbox.get.response.validator';
import { validateResponse as validateMailboxChangesResponse } from './Mailbox.changes.response.validator';
import { validateResponse as validateEmailGetResponse } from './Email.get.response.validator';
import { validateResponse as validateEmailChangesResponse } from './Email.changes.response.validator';
import { validateResponse as validateEmailQueryResponse } from './Email.query.response.validator';
import { validateResponse as validateEmailQueryChangesResponse } from './Email.queryChanges.response.validator';
import { validateResponse as validateEmailSetResponse } from './Email.set.response.validator';
import { validateResponse as validateThreadGetResponse } from './Thread.get.response.validator';
import { validateResponse as validateMailboxSetResponse } from './Mailbox.set.response.validator';
import { validateResponse as validateMailboxQueryResponse } from './Mailbox.query.response.validator';
import { validateResponse as validateEmailImportResponse } from './Email.import.response.validator';
import { validateResponse as validateEmailCopyResponse } from './Email.copy.response.validator';
import { validateResponse as validateEmailParseResponse } from './Email.parse.response.validator';
import { validateResponse as validateThreadQueryResponse } from './Thread.query.response.validator';
import { validateResponse as validateThreadChangesResponse } from './Thread.changes.response.validator';
import { validateResponse as validateEmailSubmissionGetResponse } from './EmailSubmission.get.response.validator';
import { validateResponse as validateEmailSubmissionSetResponse } from './EmailSubmission.set.response.validator';
import { validateResponse as validateEmailSubmissionQueryResponse } from './EmailSubmission.query.response.validator';
import { validateResponse as validateEmailSubmissionQueryChangesResponse } from './EmailSubmission.queryChanges.response.validator';
import { validateResponse as validateEmailSubmissionChangesResponse } from './EmailSubmission.changes.response.validator';
import { validateResponse as validateIdentityGetResponse } from './Identity.get.response.validator';
import { validateResponse as validateIdentitySetResponse } from './Identity.set.response.validator';
import { validateResponse as validateIdentityChangesResponse } from './Identity.changes.response.validator';
import { validateResponse as validateMailboxQueryChangesResponse } from './Mailbox.queryChanges.response.validator';
import { validateResponse as validateThreadQueryChangesResponse } from './Thread.queryChanges.response.validator';
import { validateResponse as validateAddressBookGetResponse } from './AddressBook.get.response.validator';
import { validateResponse as validateAddressBookSetResponse } from './AddressBook.set.response.validator';
import { validateResponse as validateAddressBookQueryResponse } from './AddressBook.query.response.validator';
import { validateResponse as validateAddressBookQueryChangesResponse } from './AddressBook.queryChanges.response.validator';
import { validateResponse as validateAddressBookChangesResponse } from './AddressBook.changes.response.validator';
import { validateResponse as validateContactCardGetResponse } from './ContactCard.get.response.validator';
import { validateResponse as validateContactCardSetResponse } from './ContactCard.set.response.validator';
import { validateResponse as validateContactCardQueryResponse } from './ContactCard.query.response.validator';
import { validateResponse as validateContactCardQueryChangesResponse } from './ContactCard.queryChanges.response.validator';
import { validateResponse as validateContactCardChangesResponse } from './ContactCard.changes.response.validator';
import { validateResponse as validateContactCardCopyResponse } from './ContactCard.copy.response.validator';
import { validateResponse as validatePrincipalGetResponse } from './Principal.get.response.validator';
import { validateResponse as validatePrincipalSetResponse } from './Principal.set.response.validator';
import { validateResponse as validatePrincipalQueryResponse } from './Principal.query.response.validator';
import { validateResponse as validatePrincipalQueryChangesResponse } from './Principal.queryChanges.response.validator';
import { validateResponse as validatePrincipalChangesResponse } from './Principal.changes.response.validator';
import { validateResponse as validateShareNotificationGetResponse } from './ShareNotification.get.response.validator';
import { validateResponse as validateShareNotificationSetResponse } from './ShareNotification.set.response.validator';
import { validateResponse as validateShareNotificationQueryResponse } from './ShareNotification.query.response.validator';
import { validateResponse as validateShareNotificationQueryChangesResponse } from './ShareNotification.queryChanges.response.validator';
import { validateResponse as validateShareNotificationChangesResponse } from './ShareNotification.changes.response.validator';

export const responseValidators: Record<string, (data: unknown) => boolean> = {
  "Mailbox/get": validateMailboxGetResponse,
  "Mailbox/changes": validateMailboxChangesResponse,
  "Email/get": validateEmailGetResponse,
  "Email/changes": validateEmailChangesResponse,
  "Email/query": validateEmailQueryResponse,
  "Email/queryChanges": validateEmailQueryChangesResponse,
  "Email/set": validateEmailSetResponse,
  "Thread/get": validateThreadGetResponse,
  "Mailbox/set": validateMailboxSetResponse,
  "Mailbox/query": validateMailboxQueryResponse,
  "Email/import": validateEmailImportResponse,
  "Email/copy": validateEmailCopyResponse,
  "Email/parse": validateEmailParseResponse,
  "Thread/query": validateThreadQueryResponse,
  "Thread/changes": validateThreadChangesResponse,
  "EmailSubmission/get": validateEmailSubmissionGetResponse,
  "EmailSubmission/set": validateEmailSubmissionSetResponse,
  "EmailSubmission/query": validateEmailSubmissionQueryResponse,
  "EmailSubmission/queryChanges": validateEmailSubmissionQueryChangesResponse,
  "EmailSubmission/changes": validateEmailSubmissionChangesResponse,
  "Identity/get": validateIdentityGetResponse,
  "Identity/set": validateIdentitySetResponse,
  "Identity/changes": validateIdentityChangesResponse,
  "Mailbox/queryChanges": validateMailboxQueryChangesResponse,
  "Thread/queryChanges": validateThreadQueryChangesResponse,
  "AddressBook/get": validateAddressBookGetResponse,
  "AddressBook/set": validateAddressBookSetResponse,
  "AddressBook/query": validateAddressBookQueryResponse,
  "AddressBook/queryChanges": validateAddressBookQueryChangesResponse,
  "AddressBook/changes": validateAddressBookChangesResponse,
  "ContactCard/get": validateContactCardGetResponse,
  "ContactCard/set": validateContactCardSetResponse,
  "ContactCard/query": validateContactCardQueryResponse,
  "ContactCard/queryChanges": validateContactCardQueryChangesResponse,
  "ContactCard/changes": validateContactCardChangesResponse,
  "ContactCard/copy": validateContactCardCopyResponse,
  "Principal/get": validatePrincipalGetResponse,
  "Principal/set": validatePrincipalSetResponse,
  "Principal/query": validatePrincipalQueryResponse,
  "Principal/queryChanges": validatePrincipalQueryChangesResponse,
  "Principal/changes": validatePrincipalChangesResponse,
  "ShareNotification/get": validateShareNotificationGetResponse,
  "ShareNotification/set": validateShareNotificationSetResponse,
  "ShareNotification/query": validateShareNotificationQueryResponse,
  "ShareNotification/queryChanges": validateShareNotificationQueryChangesResponse,
  "ShareNotification/changes": validateShareNotificationChangesResponse
};
