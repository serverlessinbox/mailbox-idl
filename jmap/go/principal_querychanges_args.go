// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// PrincipalQueryChangesArgs Principal/queryChanges args
type PrincipalQueryChangesArgs struct {
	AccountID string `json:"accountId"` // The account to check for query changes.
	Filter map[string]any `json:"filter,omitempty"` // Must match the filter used in the original Principal/query call.
	Sort []map[string]any `json:"sort,omitempty"` // Must match the sort used in the original Principal/query call.
	SinceQueryState string `json:"sinceQueryState"` // The queryState from the previous Principal/query or Principal/queryChanges response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return. If exceeded, hasMoreChanges will be true.
	UpToID *string `json:"upToId,omitempty"` // Return changes only up to and including this PrincipalId.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the updated total count of results.
}
