// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailCopyResponse Response for Email/copy (RFC 8621 §5.7 / RFC 8620 §5.4).
type EmailCopyResponse struct {
	FromAccountID string `json:"fromAccountId"` // The account the emails were copied from.
	AccountID string `json:"accountId"` // The account the emails were copied into.
	OldState *string `json:"oldState"` // The Email state before the copy, or null if the destination account had no prior state.
	NewState string `json:"newState"` // The Email state after the copy.
	Created map[string]map[string]interface{} `json:"created,omitempty"` // Map of creation id to created Email object (subset: id, blobId, threadId, size).
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Map of creation id to SetError for failed copies.
}
