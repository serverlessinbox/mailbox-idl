// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionChangesResponse Response for EmailSubmission/changes (RFC 8621 §7.4 / RFC 8620 §5.2).
type EmailSubmissionChangesResponse struct {
	AccountID string `json:"accountId"` // The account these changes are for.
	OldState string `json:"oldState"` // The sinceState value passed in the request.
	NewState string `json:"newState"` // The current EmailSubmission state after these changes.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, more changes exist beyond maxChanges; make another call with newState as sinceState.
	Created []string `json:"created"` // EmailSubmission ids created since sinceState.
	Updated []string `json:"updated"` // EmailSubmission ids updated since sinceState.
	Destroyed []string `json:"destroyed"` // EmailSubmission ids destroyed since sinceState.
}
