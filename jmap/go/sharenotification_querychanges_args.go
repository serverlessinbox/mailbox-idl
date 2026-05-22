// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationQueryChangesArgs ShareNotification/queryChanges args
type ShareNotificationQueryChangesArgs struct {
	AccountID string `json:"accountId"` // The account to check for query changes.
	Sort []map[string]interface{} `json:"sort,omitempty"` // Must match the sort used in the original ShareNotification/query call.
	SinceQueryState string `json:"sinceQueryState"` // The queryState from the previous ShareNotification/query or ShareNotification/queryChanges response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return. If exceeded, hasMoreChanges will be true.
	UpToID *string `json:"upToId,omitempty"` // Return changes only up to and including this ShareNotificationId.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the updated total count of results.
}
