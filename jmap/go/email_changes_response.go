// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailChangesResponse Email/changes response
type EmailChangesResponse struct {
	AccountID string `json:"accountId"` // The account these changes belong to.
	OldState string `json:"oldState"` // The state this response starts from (matches sinceState from the request).
	NewState string `json:"newState"` // The current state after all listed changes; pass to the next call.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, additional changes exist beyond maxChanges. Call again with newState.
	Created []string `json:"created"` // IDs of emails created since sinceState.
	Updated []string `json:"updated"` // IDs of emails whose properties changed since sinceState.
	Destroyed []string `json:"destroyed"` // IDs of emails destroyed since sinceState.
}
