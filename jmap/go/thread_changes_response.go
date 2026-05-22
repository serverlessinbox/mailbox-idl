// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ThreadChangesResponse Response for Thread/changes (RFC 8621 §2.2 / RFC 8620 §5.2).
type ThreadChangesResponse struct {
	AccountID string `json:"accountId"` // The account these changes are for.
	OldState string `json:"oldState"` // The sinceState value passed in the request.
	NewState string `json:"newState"` // The current Thread state after these changes.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, more changes exist beyond maxChanges; make another call with newState as sinceState.
	Created []string `json:"created"` // Thread ids created since sinceState.
	Updated []string `json:"updated"` // Thread ids updated since sinceState.
	Destroyed []string `json:"destroyed"` // Thread ids destroyed since sinceState.
}
