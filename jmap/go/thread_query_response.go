// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ThreadQueryResponse Response for Thread/query (RFC 8621 §2.3 / RFC 8620 §5.5).
type ThreadQueryResponse struct {
	AccountID string `json:"accountId"` // The account the query was run against.
	QueryState string `json:"queryState"` // Server state string for this query result.
	CanCalculateChanges bool `json:"canCalculateChanges"` // Whether the server can calculate query changes.
	Position int64 `json:"position"` // Zero-based index of the first result in ids.
	IDs []string `json:"ids"` // The Thread ids in the requested window.
	Total *int64 `json:"total,omitempty"` // Total number of results (if calculateTotal was true).
	Limit *int64 `json:"limit,omitempty"` // The limit applied to this query.
	PageToken *string `json:"pageToken,omitempty"` // Opaque cursor for the next page of results. null or absent means this is the last page. See https://specs.serverlessinbox.com/page-token
}
