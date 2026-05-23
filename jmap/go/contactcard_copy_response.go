// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardCopyResponse Response from ContactCard/copy (RFC 9610 §6.6).
type ContactCardCopyResponse struct {
	FromAccountID string `json:"fromAccountId"` // The source account.
	AccountID string `json:"accountId"` // The destination account.
	OldState *string `json:"oldState,omitempty"` // The ContactCard state in the destination account before this operation.
	NewState *string `json:"newState,omitempty"` // The ContactCard state in the destination account after this operation.
	Created map[string]ContactCard `json:"created,omitempty"` // Successfully copied contact cards, keyed by client creation id.
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Creation ids that failed, with a SetError.
}
