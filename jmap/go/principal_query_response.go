// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// PrincipalQueryResponse Response from Principal/query (RFC 9670 §3.4).
type PrincipalQueryResponse struct {
	AccountID string `json:"accountId"` // The account the query ran against.
	QueryState string `json:"queryState"` // Opaque state string. Pass to Principal/queryChanges to detect future changes.
	CanCalculateChanges bool `json:"canCalculateChanges"` // Whether Principal/queryChanges can be used with this query.
	Position int64 `json:"position"` // 0-based index of the first id in the ids array.
	IDs []string `json:"ids"` // The matching PrincipalIds in the requested order.
	Total *int64 `json:"total,omitempty"` // Total number of matching principals. Only present if calculateTotal was true.
	Limit *int64 `json:"limit,omitempty"` // The limit applied. Only present if a limit was applied.
}
