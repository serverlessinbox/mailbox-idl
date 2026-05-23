// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionQueryArgs Arguments for EmailSubmission/query (RFC 8621 §7.2 / RFC 8620 §5.5).
type EmailSubmissionQueryArgs struct {
	AccountID string `json:"accountId"` // The account to query EmailSubmission objects in.
	Filter map[string]any `json:"filter,omitempty"` // Conditions to filter EmailSubmission objects.
	Sort []map[string]any `json:"sort,omitempty"` // List of Comparator objects specifying the sort order.
	Position *int64 `json:"position,omitempty"` // Zero-based index of the first result to return.
	Anchor *string `json:"anchor,omitempty"` // Id of an item to anchor the result window on.
	AnchorOffset *int64 `json:"anchorOffset,omitempty"` // Offset relative to the anchor.
	Limit *int64 `json:"limit,omitempty"` // Maximum number of ids to return.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the total count of results.
}
