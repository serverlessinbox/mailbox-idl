// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxSetResponse Response from Mailbox/set (RFC 8621 §3.5).
type MailboxSetResponse struct {
	AccountID string `json:"accountId"` // The account the changes were applied to.
	OldState *string `json:"oldState,omitempty"` // The Mailbox state before this set, or null if the server cannot calculate it.
	NewState string `json:"newState"` // The Mailbox state after this set.
	Created map[string]MailboxExt `json:"created,omitempty"` // Successfully created mailboxes, keyed by client creation id.
	Updated map[string]*MailboxExt `json:"updated,omitempty"` // Map of successfully updated MailboxId to the updated object (or null if unchanged properties are not returned).
	Destroyed []string `json:"destroyed,omitempty"` // MailboxIds that were successfully destroyed.
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Creation ids that failed, with a SetError.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // MailboxIds that failed to update, with a SetError.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // MailboxIds that failed to destroy, with a SetError.
}
