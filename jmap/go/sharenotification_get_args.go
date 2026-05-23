// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationGetArgs ShareNotification/get args
type ShareNotificationGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch share notifications from.
	IDs []string `json:"ids,omitempty"` // IDs of specific share notifications to fetch. Null or omitted to fetch all share notifications.
	Properties []string `json:"properties,omitempty"` // ShareNotification properties to include in the response. Null or omitted for all properties.
}
