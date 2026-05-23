// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationChangesArgs ShareNotification/changes args
type ShareNotificationChangesArgs struct {
	AccountID string `json:"accountId"` // The account to fetch share notification changes for.
	SinceState string `json:"sinceState"` // The state string from the last ShareNotification/get or ShareNotification/changes response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
}
