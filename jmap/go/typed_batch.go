// Code generated from mailbox-idl/jmap manifest. DO NOT EDIT.

package jmapsdk

// MailboxGet appends an Mailbox/get call to the batch and returns a typed handle.
func (tb *TypedBatch) MailboxGet(args MailboxGetArgs) BatchHandle[MailboxGetResponse] {
	callID := tb.b.Add("Mailbox/get", args)
	return BatchHandle[MailboxGetResponse]{callID: callID, methodName: "Mailbox/get"}
}

// MailboxChanges appends an Mailbox/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) MailboxChanges(args MailboxChangesArgs) BatchHandle[MailboxChangesResponse] {
	callID := tb.b.Add("Mailbox/changes", args)
	return BatchHandle[MailboxChangesResponse]{callID: callID, methodName: "Mailbox/changes"}
}

// EmailGet appends an Email/get call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailGet(args EmailGetArgs) BatchHandle[EmailGetResponse] {
	callID := tb.b.Add("Email/get", args)
	return BatchHandle[EmailGetResponse]{callID: callID, methodName: "Email/get"}
}

// EmailChanges appends an Email/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailChanges(args EmailChangesArgs) BatchHandle[EmailChangesResponse] {
	callID := tb.b.Add("Email/changes", args)
	return BatchHandle[EmailChangesResponse]{callID: callID, methodName: "Email/changes"}
}

// EmailQuery appends an Email/query call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailQuery(args EmailQueryArgs) BatchHandle[EmailQueryResponse] {
	callID := tb.b.Add("Email/query", args)
	return BatchHandle[EmailQueryResponse]{callID: callID, methodName: "Email/query"}
}

// EmailQueryChanges appends an Email/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailQueryChanges(args EmailQueryChangesArgs) BatchHandle[EmailQueryChangesResponse] {
	callID := tb.b.Add("Email/queryChanges", args)
	return BatchHandle[EmailQueryChangesResponse]{callID: callID, methodName: "Email/queryChanges"}
}

// EmailSet appends an Email/set call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailSet(args EmailSetArgs) BatchHandle[EmailSetResponse] {
	callID := tb.b.Add("Email/set", args)
	return BatchHandle[EmailSetResponse]{callID: callID, methodName: "Email/set"}
}

// ThreadGet appends an Thread/get call to the batch and returns a typed handle.
func (tb *TypedBatch) ThreadGet(args ThreadGetArgs) BatchHandle[ThreadGetResponse] {
	callID := tb.b.Add("Thread/get", args)
	return BatchHandle[ThreadGetResponse]{callID: callID, methodName: "Thread/get"}
}

// MailboxSet appends an Mailbox/set call to the batch and returns a typed handle.
func (tb *TypedBatch) MailboxSet(args MailboxSetArgs) BatchHandle[MailboxSetResponse] {
	callID := tb.b.Add("Mailbox/set", args)
	return BatchHandle[MailboxSetResponse]{callID: callID, methodName: "Mailbox/set"}
}

// MailboxQuery appends an Mailbox/query call to the batch and returns a typed handle.
func (tb *TypedBatch) MailboxQuery(args MailboxQueryArgs) BatchHandle[MailboxQueryResponse] {
	callID := tb.b.Add("Mailbox/query", args)
	return BatchHandle[MailboxQueryResponse]{callID: callID, methodName: "Mailbox/query"}
}

// EmailImport appends an Email/import call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailImport(args EmailImportArgs) BatchHandle[EmailImportResponse] {
	callID := tb.b.Add("Email/import", args)
	return BatchHandle[EmailImportResponse]{callID: callID, methodName: "Email/import"}
}

// EmailCopy appends an Email/copy call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailCopy(args EmailCopyArgs) BatchHandle[EmailCopyResponse] {
	callID := tb.b.Add("Email/copy", args)
	return BatchHandle[EmailCopyResponse]{callID: callID, methodName: "Email/copy"}
}

// EmailParse appends an Email/parse call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailParse(args EmailParseArgs) BatchHandle[EmailParseResponse] {
	callID := tb.b.Add("Email/parse", args)
	return BatchHandle[EmailParseResponse]{callID: callID, methodName: "Email/parse"}
}

// ThreadQuery appends an Thread/query call to the batch and returns a typed handle.
func (tb *TypedBatch) ThreadQuery(args ThreadQueryArgs) BatchHandle[ThreadQueryResponse] {
	callID := tb.b.Add("Thread/query", args)
	return BatchHandle[ThreadQueryResponse]{callID: callID, methodName: "Thread/query"}
}

// ThreadChanges appends an Thread/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) ThreadChanges(args ThreadChangesArgs) BatchHandle[ThreadChangesResponse] {
	callID := tb.b.Add("Thread/changes", args)
	return BatchHandle[ThreadChangesResponse]{callID: callID, methodName: "Thread/changes"}
}

// EmailSubmissionGet appends an EmailSubmission/get call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailSubmissionGet(args EmailSubmissionGetArgs) BatchHandle[EmailSubmissionGetResponse] {
	callID := tb.b.Add("EmailSubmission/get", args)
	return BatchHandle[EmailSubmissionGetResponse]{callID: callID, methodName: "EmailSubmission/get"}
}

// EmailSubmissionSet appends an EmailSubmission/set call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailSubmissionSet(args EmailSubmissionSetArgs) BatchHandle[EmailSubmissionSetResponse] {
	callID := tb.b.Add("EmailSubmission/set", args)
	return BatchHandle[EmailSubmissionSetResponse]{callID: callID, methodName: "EmailSubmission/set"}
}

// EmailSubmissionQuery appends an EmailSubmission/query call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailSubmissionQuery(args EmailSubmissionQueryArgs) BatchHandle[EmailSubmissionQueryResponse] {
	callID := tb.b.Add("EmailSubmission/query", args)
	return BatchHandle[EmailSubmissionQueryResponse]{callID: callID, methodName: "EmailSubmission/query"}
}

// EmailSubmissionQueryChanges appends an EmailSubmission/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailSubmissionQueryChanges(args EmailSubmissionQueryChangesArgs) BatchHandle[EmailSubmissionQueryChangesResponse] {
	callID := tb.b.Add("EmailSubmission/queryChanges", args)
	return BatchHandle[EmailSubmissionQueryChangesResponse]{callID: callID, methodName: "EmailSubmission/queryChanges"}
}

// EmailSubmissionChanges appends an EmailSubmission/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) EmailSubmissionChanges(args EmailSubmissionChangesArgs) BatchHandle[EmailSubmissionChangesResponse] {
	callID := tb.b.Add("EmailSubmission/changes", args)
	return BatchHandle[EmailSubmissionChangesResponse]{callID: callID, methodName: "EmailSubmission/changes"}
}

// IdentityGet appends an Identity/get call to the batch and returns a typed handle.
func (tb *TypedBatch) IdentityGet(args IdentityGetArgs) BatchHandle[IdentityGetResponse] {
	callID := tb.b.Add("Identity/get", args)
	return BatchHandle[IdentityGetResponse]{callID: callID, methodName: "Identity/get"}
}

// IdentitySet appends an Identity/set call to the batch and returns a typed handle.
func (tb *TypedBatch) IdentitySet(args IdentitySetArgs) BatchHandle[IdentitySetResponse] {
	callID := tb.b.Add("Identity/set", args)
	return BatchHandle[IdentitySetResponse]{callID: callID, methodName: "Identity/set"}
}

// IdentityChanges appends an Identity/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) IdentityChanges(args IdentityChangesArgs) BatchHandle[IdentityChangesResponse] {
	callID := tb.b.Add("Identity/changes", args)
	return BatchHandle[IdentityChangesResponse]{callID: callID, methodName: "Identity/changes"}
}

// MailboxQueryChanges appends an Mailbox/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) MailboxQueryChanges(args MailboxQueryChangesArgs) BatchHandle[MailboxQueryChangesResponse] {
	callID := tb.b.Add("Mailbox/queryChanges", args)
	return BatchHandle[MailboxQueryChangesResponse]{callID: callID, methodName: "Mailbox/queryChanges"}
}

// ThreadQueryChanges appends an Thread/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) ThreadQueryChanges(args ThreadQueryChangesArgs) BatchHandle[ThreadQueryChangesResponse] {
	callID := tb.b.Add("Thread/queryChanges", args)
	return BatchHandle[ThreadQueryChangesResponse]{callID: callID, methodName: "Thread/queryChanges"}
}

// AddressBookGet appends an AddressBook/get call to the batch and returns a typed handle.
func (tb *TypedBatch) AddressBookGet(args AddressBookGetArgs) BatchHandle[AddressBookGetResponse] {
	callID := tb.b.Add("AddressBook/get", args)
	return BatchHandle[AddressBookGetResponse]{callID: callID, methodName: "AddressBook/get"}
}

// AddressBookSet appends an AddressBook/set call to the batch and returns a typed handle.
func (tb *TypedBatch) AddressBookSet(args AddressBookSetArgs) BatchHandle[AddressBookSetResponse] {
	callID := tb.b.Add("AddressBook/set", args)
	return BatchHandle[AddressBookSetResponse]{callID: callID, methodName: "AddressBook/set"}
}

// AddressBookQuery appends an AddressBook/query call to the batch and returns a typed handle.
func (tb *TypedBatch) AddressBookQuery(args AddressBookQueryArgs) BatchHandle[AddressBookQueryResponse] {
	callID := tb.b.Add("AddressBook/query", args)
	return BatchHandle[AddressBookQueryResponse]{callID: callID, methodName: "AddressBook/query"}
}

// AddressBookQueryChanges appends an AddressBook/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) AddressBookQueryChanges(args AddressBookQueryChangesArgs) BatchHandle[AddressBookQueryChangesResponse] {
	callID := tb.b.Add("AddressBook/queryChanges", args)
	return BatchHandle[AddressBookQueryChangesResponse]{callID: callID, methodName: "AddressBook/queryChanges"}
}

// AddressBookChanges appends an AddressBook/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) AddressBookChanges(args AddressBookChangesArgs) BatchHandle[AddressBookChangesResponse] {
	callID := tb.b.Add("AddressBook/changes", args)
	return BatchHandle[AddressBookChangesResponse]{callID: callID, methodName: "AddressBook/changes"}
}

// ContactCardGet appends an ContactCard/get call to the batch and returns a typed handle.
func (tb *TypedBatch) ContactCardGet(args ContactCardGetArgs) BatchHandle[ContactCardGetResponse] {
	callID := tb.b.Add("ContactCard/get", args)
	return BatchHandle[ContactCardGetResponse]{callID: callID, methodName: "ContactCard/get"}
}

// ContactCardSet appends an ContactCard/set call to the batch and returns a typed handle.
func (tb *TypedBatch) ContactCardSet(args ContactCardSetArgs) BatchHandle[ContactCardSetResponse] {
	callID := tb.b.Add("ContactCard/set", args)
	return BatchHandle[ContactCardSetResponse]{callID: callID, methodName: "ContactCard/set"}
}

// ContactCardQuery appends an ContactCard/query call to the batch and returns a typed handle.
func (tb *TypedBatch) ContactCardQuery(args ContactCardQueryArgs) BatchHandle[ContactCardQueryResponse] {
	callID := tb.b.Add("ContactCard/query", args)
	return BatchHandle[ContactCardQueryResponse]{callID: callID, methodName: "ContactCard/query"}
}

// ContactCardQueryChanges appends an ContactCard/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) ContactCardQueryChanges(args ContactCardQueryChangesArgs) BatchHandle[ContactCardQueryChangesResponse] {
	callID := tb.b.Add("ContactCard/queryChanges", args)
	return BatchHandle[ContactCardQueryChangesResponse]{callID: callID, methodName: "ContactCard/queryChanges"}
}

// ContactCardChanges appends an ContactCard/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) ContactCardChanges(args ContactCardChangesArgs) BatchHandle[ContactCardChangesResponse] {
	callID := tb.b.Add("ContactCard/changes", args)
	return BatchHandle[ContactCardChangesResponse]{callID: callID, methodName: "ContactCard/changes"}
}

// ContactCardCopy appends an ContactCard/copy call to the batch and returns a typed handle.
func (tb *TypedBatch) ContactCardCopy(args ContactCardCopyArgs) BatchHandle[ContactCardCopyResponse] {
	callID := tb.b.Add("ContactCard/copy", args)
	return BatchHandle[ContactCardCopyResponse]{callID: callID, methodName: "ContactCard/copy"}
}

// PrincipalGet appends an Principal/get call to the batch and returns a typed handle.
func (tb *TypedBatch) PrincipalGet(args PrincipalGetArgs) BatchHandle[PrincipalGetResponse] {
	callID := tb.b.Add("Principal/get", args)
	return BatchHandle[PrincipalGetResponse]{callID: callID, methodName: "Principal/get"}
}

// PrincipalSet appends an Principal/set call to the batch and returns a typed handle.
func (tb *TypedBatch) PrincipalSet(args PrincipalSetArgs) BatchHandle[PrincipalSetResponse] {
	callID := tb.b.Add("Principal/set", args)
	return BatchHandle[PrincipalSetResponse]{callID: callID, methodName: "Principal/set"}
}

// PrincipalQuery appends an Principal/query call to the batch and returns a typed handle.
func (tb *TypedBatch) PrincipalQuery(args PrincipalQueryArgs) BatchHandle[PrincipalQueryResponse] {
	callID := tb.b.Add("Principal/query", args)
	return BatchHandle[PrincipalQueryResponse]{callID: callID, methodName: "Principal/query"}
}

// PrincipalQueryChanges appends an Principal/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) PrincipalQueryChanges(args PrincipalQueryChangesArgs) BatchHandle[PrincipalQueryChangesResponse] {
	callID := tb.b.Add("Principal/queryChanges", args)
	return BatchHandle[PrincipalQueryChangesResponse]{callID: callID, methodName: "Principal/queryChanges"}
}

// PrincipalChanges appends an Principal/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) PrincipalChanges(args PrincipalChangesArgs) BatchHandle[PrincipalChangesResponse] {
	callID := tb.b.Add("Principal/changes", args)
	return BatchHandle[PrincipalChangesResponse]{callID: callID, methodName: "Principal/changes"}
}

// ShareNotificationGet appends an ShareNotification/get call to the batch and returns a typed handle.
func (tb *TypedBatch) ShareNotificationGet(args ShareNotificationGetArgs) BatchHandle[ShareNotificationGetResponse] {
	callID := tb.b.Add("ShareNotification/get", args)
	return BatchHandle[ShareNotificationGetResponse]{callID: callID, methodName: "ShareNotification/get"}
}

// ShareNotificationSet appends an ShareNotification/set call to the batch and returns a typed handle.
func (tb *TypedBatch) ShareNotificationSet(args ShareNotificationSetArgs) BatchHandle[ShareNotificationSetResponse] {
	callID := tb.b.Add("ShareNotification/set", args)
	return BatchHandle[ShareNotificationSetResponse]{callID: callID, methodName: "ShareNotification/set"}
}

// ShareNotificationQuery appends an ShareNotification/query call to the batch and returns a typed handle.
func (tb *TypedBatch) ShareNotificationQuery(args ShareNotificationQueryArgs) BatchHandle[ShareNotificationQueryResponse] {
	callID := tb.b.Add("ShareNotification/query", args)
	return BatchHandle[ShareNotificationQueryResponse]{callID: callID, methodName: "ShareNotification/query"}
}

// ShareNotificationQueryChanges appends an ShareNotification/queryChanges call to the batch and returns a typed handle.
func (tb *TypedBatch) ShareNotificationQueryChanges(args ShareNotificationQueryChangesArgs) BatchHandle[ShareNotificationQueryChangesResponse] {
	callID := tb.b.Add("ShareNotification/queryChanges", args)
	return BatchHandle[ShareNotificationQueryChangesResponse]{callID: callID, methodName: "ShareNotification/queryChanges"}
}

// ShareNotificationChanges appends an ShareNotification/changes call to the batch and returns a typed handle.
func (tb *TypedBatch) ShareNotificationChanges(args ShareNotificationChangesArgs) BatchHandle[ShareNotificationChangesResponse] {
	callID := tb.b.Add("ShareNotification/changes", args)
	return BatchHandle[ShareNotificationChangesResponse]{callID: callID, methodName: "ShareNotification/changes"}
}
