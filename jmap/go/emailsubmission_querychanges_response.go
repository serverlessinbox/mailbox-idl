// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionQueryChangesResponse Response for EmailSubmission/queryChanges (RFC 8621 §7.3 / RFC 8620 §5.6).
type EmailSubmissionQueryChangesResponse struct {
	AccountID string `json:"accountId"` // The account the query changes are for.
	OldQueryState string `json:"oldQueryState"` // The sinceQueryState value passed in the request.
	NewQueryState string `json:"newQueryState"` // The current query state after these changes.
	Total *int64 `json:"total,omitempty"` // New total number of results (if calculateTotal was true).
	Removed []string `json:"removed"` // Ids removed from the query results.
	Added []map[string]interface{} `json:"added"` // Items added to the query results with their new index.
}
