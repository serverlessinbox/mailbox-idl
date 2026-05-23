// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardChangesResponse ContactCard/changes response
type ContactCardChangesResponse struct {
	AccountID string `json:"accountId"` // The account these contact card changes belong to.
	OldState string `json:"oldState"` // The state this response starts from.
	NewState string `json:"newState"` // The current state after all listed changes; pass to the next call.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, additional changes exist beyond maxChanges. Call again with newState.
	Created []string `json:"created"` // IDs of contact cards created since sinceState.
	Updated []string `json:"updated"` // IDs of contact cards whose properties changed since sinceState.
	Destroyed []string `json:"destroyed"` // IDs of contact cards destroyed since sinceState.
}
