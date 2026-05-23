// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionQueryChangesArgs Arguments for EmailSubmission/queryChanges (RFC 8621 §7.3 / RFC 8620 §5.6).
type EmailSubmissionQueryChangesArgs struct {
	AccountID string `json:"accountId"` // The account to get EmailSubmission query changes for.
	Filter map[string]any `json:"filter,omitempty"` // Must match the filter used in the original query.
	Sort []map[string]any `json:"sort,omitempty"` // Must match the sort used in the original query.
	SinceQueryState string `json:"sinceQueryState"` // The queryState to get changes since.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return.
	UpToID *string `json:"upToId,omitempty"` // Stop reporting changes after this id.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the new total count of query results.
}
