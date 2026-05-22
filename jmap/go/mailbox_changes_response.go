// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxChangesResponse Mailbox/changes response
type MailboxChangesResponse struct {
	AccountID string `json:"accountId"` // The account these mailbox changes belong to.
	OldState string `json:"oldState"` // The state this response starts from.
	NewState string `json:"newState"` // The current state after all listed changes; pass to the next call.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, additional changes exist beyond maxChanges. Call again with newState.
	Created []string `json:"created"` // IDs of mailboxes created since sinceState.
	Updated []string `json:"updated"` // IDs of mailboxes whose properties changed since sinceState.
	Destroyed []string `json:"destroyed"` // IDs of mailboxes destroyed since sinceState.
}
