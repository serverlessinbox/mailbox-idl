// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookQueryChangesResponse AddressBook/queryChanges response
type AddressBookQueryChangesResponse struct {
	AccountID string `json:"accountId"` // The account these query changes belong to.
	OldQueryState string `json:"oldQueryState"` // The queryState this response starts from (matches sinceQueryState from request).
	NewQueryState string `json:"newQueryState"` // The current queryState. Pass to the next AddressBook/queryChanges call.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, more changes exist beyond maxChanges. Call again with newQueryState.
	Removed []string `json:"removed"` // AddressBookIds that are no longer in the query result set.
	Added []map[string]interface{} `json:"added"` // Address books that are now in the result set, with their new positions.
	Total *int64 `json:"total,omitempty"` // Updated total count of results (if calculateTotal was true in the original query).
}
