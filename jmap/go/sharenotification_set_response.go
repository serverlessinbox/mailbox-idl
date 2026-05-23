// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationSetResponse Response from ShareNotification/set (RFC 9670 §4.3).
type ShareNotificationSetResponse struct {
	AccountID string `json:"accountId"` // The account the changes were applied to.
	OldState *string `json:"oldState,omitempty"` // The ShareNotification state before this set, or null if the server cannot calculate it.
	NewState string `json:"newState"` // The ShareNotification state after this set.
	Created map[string]ShareNotification `json:"created,omitempty"` // Typically empty — share notifications are created by the server.
	Updated map[string]*ShareNotification `json:"updated,omitempty"` // Typically empty — share notifications are immutable.
	Destroyed []string `json:"destroyed,omitempty"` // ShareNotificationIds that were successfully dismissed.
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Creation ids that failed, with a SetError.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // ShareNotificationIds that failed to update, with a SetError.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // ShareNotificationIds that failed to destroy, with a SetError.
}
