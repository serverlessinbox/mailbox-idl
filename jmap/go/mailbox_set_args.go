// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxSetArgs Arguments for Mailbox/set (RFC 8621 §3.5). Creates, updates, or destroys Mailbox objects.
type MailboxSetArgs struct {
	AccountID string `json:"accountId"` // The account to apply changes to.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard. The call fails with stateMismatch if the Mailbox state differs.
	Create map[string]MailboxCreate `json:"create,omitempty"` // Map of client-assigned creation ids to Mailbox objects to create.
	Update map[string]PatchObject `json:"update,omitempty"` // Map of MailboxId to PatchObject. Only explicitly listed properties are changed.
	Destroy []string `json:"destroy,omitempty"` // MailboxIds to delete.
	OnDestroyRemoveEmails *bool `json:"onDestroyRemoveEmails,omitempty"` // If true, also destroy all emails in the mailbox. Default false; destroying a non-empty mailbox without this flag results in a mailboxHasChild or mailboxHasEmail error.
}
