// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxChangesArgs Mailbox/changes args
type MailboxChangesArgs struct {
	AccountID string `json:"accountId"` // The account to fetch mailbox changes for.
	SinceState string `json:"sinceState"` // The state string from the last Mailbox/get or Mailbox/changes response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
}
