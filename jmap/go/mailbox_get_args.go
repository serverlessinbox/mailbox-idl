// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxGetArgs Mailbox/get args
type MailboxGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch mailboxes from.
	IDs []string `json:"ids,omitempty"` // IDs of specific mailboxes to fetch. Omit to fetch all mailboxes for the account.
	Properties []string `json:"properties,omitempty"` // Mailbox properties to include in the response. Omit for all properties.
}
