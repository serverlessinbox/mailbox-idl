// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationChangesResponse ShareNotification/changes response
type ShareNotificationChangesResponse struct {
	AccountID string `json:"accountId"` // The account these share notification changes belong to.
	OldState string `json:"oldState"` // The state this response starts from.
	NewState string `json:"newState"` // The current state after all listed changes; pass to the next call.
	HasMoreChanges bool `json:"hasMoreChanges"` // If true, additional changes exist beyond maxChanges. Call again with newState.
	Created []string `json:"created"` // IDs of share notifications created since sinceState.
	Updated []string `json:"updated"` // IDs of share notifications whose properties changed since sinceState.
	Destroyed []string `json:"destroyed"` // IDs of share notifications destroyed since sinceState.
}
