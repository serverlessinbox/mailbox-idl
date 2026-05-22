// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ThreadQueryChangesArgs Thread/queryChanges args
type ThreadQueryChangesArgs struct {
	AccountID string `json:"accountId"` // The account to check for query changes.
	Filter map[string]interface{} `json:"filter,omitempty"` // Must match the filter used in the original Thread/query call.
	Sort []map[string]interface{} `json:"sort,omitempty"` // Must match the sort used in the original Thread/query call.
	SinceQueryState string `json:"sinceQueryState"` // The queryState from the previous Thread/query or Thread/queryChanges response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return. If exceeded, hasMoreChanges will be true.
	UpToID *string `json:"upToId,omitempty"` // Return changes only up to and including this ThreadId.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the updated total count of results.
}
