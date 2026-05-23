// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardQueryResponse Response from ContactCard/query (RFC 9610 §6.4).
type ContactCardQueryResponse struct {
	AccountID string `json:"accountId"` // The account the query ran against.
	QueryState string `json:"queryState"` // Opaque state string. Pass to ContactCard/queryChanges to detect future changes.
	CanCalculateChanges bool `json:"canCalculateChanges"` // Whether ContactCard/queryChanges can be used with this query.
	Position int64 `json:"position"` // 0-based index of the first id in the ids array.
	IDs []string `json:"ids"` // The matching ContactCardIds in the requested order.
	Total *int64 `json:"total,omitempty"` // Total number of matching contact cards. Only present if calculateTotal was true.
	Limit *int64 `json:"limit,omitempty"` // The limit applied. Only present if a limit was applied.
}
