// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailQueryResponse Email/query response
type EmailQueryResponse struct {
	AccountID string `json:"accountId"` // The account this query result belongs to.
	QueryState string `json:"queryState"` // Opaque state string for this query. Pass to Email/queryChanges to detect changes to the result set.
	CanCalculateChanges bool `json:"canCalculateChanges"` // Whether Email/queryChanges is supported for this query.
	Position int64 `json:"position"` // Zero-based index of the first ID in the full result list.
	IDs []string `json:"ids"` // EmailIds of the results for this page, in the requested sort order.
	Total *int64 `json:"total,omitempty"` // Total number of matching emails. Only present when calculateTotal was true.
	Limit *int64 `json:"limit,omitempty"` // The limit applied by the server (may be lower than the requested limit).
	Anchor *string `json:"anchor,omitempty"` // The anchor EmailId used for this page, if anchor-based pagination was requested.
	PageToken *string `json:"pageToken,omitempty"` // Opaque cursor for the next page of results. null or absent means this is the last page. See https://specs.serverlessinbox.com/page-token
}
