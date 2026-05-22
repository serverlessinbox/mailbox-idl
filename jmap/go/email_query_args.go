// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailQueryArgs Email/query args
type EmailQueryArgs struct {
	AccountID string `json:"accountId"` // The account to query.
	Filter map[string]interface{} `json:"filter,omitempty"` // Optional filter conditions to narrow results (e.g. inMailbox, from, subject).
	Sort []map[string]interface{} `json:"sort,omitempty"` // Sort criteria. Each object has a property name and isAscending flag. Defaults to date descending.
	Position *int64 `json:"position,omitempty"` // Zero-based index of the first result to return. Cannot be combined with anchor.
	Anchor *string `json:"anchor,omitempty"` // EmailId to use as the anchor for pagination. The page starts at this email.
	AnchorOffset *int64 `json:"anchorOffset,omitempty"` // Offset in results relative to the anchor. Negative values move backwards.
	Limit *int64 `json:"limit,omitempty"` // Maximum number of EmailIds to return. Defaults to server maximum.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, compute the total number of matching emails (may be slower).
	CollapseThreads *bool `json:"collapseThreads,omitempty"` // If true, return only the latest email per thread, de-duplicating results.
	PageToken *string `json:"pageToken,omitempty"` // Opaque cursor returned by a previous Email/query response. Pass to retrieve the next page of results. Mutually exclusive with position and anchor. See https://specs.serverlessinbox.com/page-token
}
