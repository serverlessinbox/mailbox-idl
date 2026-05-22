// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailQueryChangesArgs Email/queryChanges args
type EmailQueryChangesArgs struct {
	AccountID string `json:"accountId"` // The account to check for query changes.
	Filter map[string]interface{} `json:"filter,omitempty"` // Must match the filter used in the original Email/query call.
	Sort []map[string]interface{} `json:"sort,omitempty"` // Must match the sort used in the original Email/query call.
	SinceQueryState string `json:"sinceQueryState"` // The queryState from the previous Email/query or Email/queryChanges response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return. If exceeded, hasMoreChanges will be true.
	UpToID *string `json:"upToId,omitempty"` // Return changes only up to and including this EmailId.
}
