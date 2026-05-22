// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ThreadQueryArgs Arguments for Thread/query (RFC 8621 §2.3 / RFC 8620 §5.5). Returns a sorted, filtered list of Thread ids.
type ThreadQueryArgs struct {
	AccountID string `json:"accountId"` // The account to query threads in.
	Filter map[string]interface{} `json:"filter,omitempty"` // Conditions to filter threads. See RFC 8621 for filter conditions.
	Sort []map[string]interface{} `json:"sort,omitempty"` // List of Comparator objects specifying sort order.
	Position *int64 `json:"position,omitempty"` // Zero-based index of first result to return.
	Anchor *string `json:"anchor,omitempty"` // Id of an item to anchor the result window on.
	AnchorOffset *int64 `json:"anchorOffset,omitempty"` // Offset relative to the anchor.
	Limit *int64 `json:"limit,omitempty"` // Maximum number of ids to return.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return total count of results.
	PageToken *string `json:"pageToken,omitempty"` // Opaque cursor returned by a previous Thread/query response. Pass to retrieve the next page of results. Mutually exclusive with position and anchor. See https://specs.serverlessinbox.com/page-token
}
