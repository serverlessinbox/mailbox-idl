// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// IdentityChangesResponse Response for Identity/changes (RFC 8621 §6.2 / RFC 8620 §5.2).
type IdentityChangesResponse struct {
	AccountID string `json:"accountId"` // The account these changes are for.
	OldState string `json:"oldState"` // The sinceState value passed in the request.
	NewState string `json:"newState"` // The current Identity state after these changes.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, more changes exist beyond maxChanges; make another call with newState as sinceState.
	Created []string `json:"created"` // Identity ids created since sinceState.
	Updated []string `json:"updated"` // Identity ids updated since sinceState.
	Destroyed []string `json:"destroyed"` // Identity ids destroyed since sinceState.
}
