// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailQueryChangesResponse Email/queryChanges response
type EmailQueryChangesResponse struct {
	AccountID string `json:"accountId"` // The account these query changes belong to.
	OldQueryState string `json:"oldQueryState"` // The queryState this response starts from (matches sinceQueryState from request).
	NewQueryState string `json:"newQueryState"` // The current queryState. Pass to the next Email/queryChanges call.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, more changes exist beyond maxChanges. Call again with newQueryState.
	Removed []string `json:"removed"` // EmailIds that are no longer in the query result set.
	Added []map[string]any `json:"added"` // Emails that are now in the result set, with their new positions.
	Total *int64 `json:"total,omitempty"` // Updated total count of results (if calculateTotal was true in the original query).
	UpToID *string `json:"upToId,omitempty"` // Echoes the upToId from the request, if provided.
}
