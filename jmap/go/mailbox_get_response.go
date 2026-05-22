// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxGetResponse Mailbox/get response
type MailboxGetResponse struct {
	AccountID string `json:"accountId"` // The account the mailboxes belong to.
	State string `json:"state"` // The current state of the Mailbox type. Pass to Mailbox/changes to detect future changes.
	List []MailboxExt `json:"list"` // The list of Mailbox objects that were found.
	NotFound []string `json:"notFound,omitempty"` // IDs from the request that could not be found.
}
