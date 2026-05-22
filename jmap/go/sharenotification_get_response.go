// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationGetResponse ShareNotification/get response
type ShareNotificationGetResponse struct {
	AccountID string `json:"accountId"` // The account the share notifications belong to.
	State string `json:"state"` // The current state of the ShareNotification type. Pass to ShareNotification/changes to detect future changes.
	List []ShareNotification `json:"list"` // The list of ShareNotification objects that were found.
	NotFound []string `json:"notFound"` // IDs from the request that could not be found.
}
