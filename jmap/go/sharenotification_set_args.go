// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationSetArgs Arguments for ShareNotification/set (RFC 9670 §4.3). Destroy-only: create and update are not supported.
type ShareNotificationSetArgs struct {
	AccountID string `json:"accountId"` // The account to apply changes to.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard. Fails with stateMismatch if the ShareNotification state differs.
	Create map[string]interface{} `json:"create,omitempty"` // Always results in notCreated — share notifications are created by the server.
	Update map[string]interface{} `json:"update,omitempty"` // Always results in notUpdated — share notifications are immutable.
	Destroy []string `json:"destroy,omitempty"` // ShareNotificationIds to dismiss (destroy).
}
