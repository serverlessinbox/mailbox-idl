// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxQueryResponse Response from Mailbox/query (RFC 8621 §3.3 / RFC 8620 §5.5).
type MailboxQueryResponse struct {
	AccountID string `json:"accountId"` // The account the query ran against.
	QueryState string `json:"queryState"` // Opaque state string. Pass to Mailbox/queryChanges to detect future changes.
	CanCalculateChanges bool `json:"canCalculateChanges"` // Whether Mailbox/queryChanges can be used with this query.
	Position int64 `json:"position"` // 0-based index of the first id in the ids array.
	IDs []string `json:"ids"` // The matching MailboxIds in the requested order.
	Total *int64 `json:"total,omitempty"` // Total number of matching mailboxes. Only present if calculateTotal was true.
	Limit *int64 `json:"limit,omitempty"` // The limit applied. Only present if a limit was applied.
}
