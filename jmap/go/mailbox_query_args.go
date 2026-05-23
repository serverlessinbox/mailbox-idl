// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// MailboxQueryArgs Arguments for Mailbox/query (RFC 8621 §3.3). Returns an ordered list of Mailbox ids matching a filter.
type MailboxQueryArgs struct {
	AccountID string `json:"accountId"` // The account to query mailboxes from.
	Filter map[string]any `json:"filter,omitempty"` // Filter conditions. Supported properties: parentId (MailboxId|null), name (String), role (String|null), hasAnyRole (Boolean), isSubscribed (Boolean).
	Sort []map[string]any `json:"sort,omitempty"` // Sort criteria. Each Comparator has a property (e.g. name, sortOrder) and optional isAscending (default true).
	Position *int64 `json:"position,omitempty"` // 0-based index of the first result to return.
	Anchor *string `json:"anchor,omitempty"` // A MailboxId to anchor the result page at.
	AnchorOffset *int64 `json:"anchorOffset,omitempty"` // Offset from the anchor (may be negative).
	Limit *int64 `json:"limit,omitempty"` // Maximum number of ids to return.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the total number of matching mailboxes.
}
