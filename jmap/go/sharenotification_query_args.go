// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ShareNotificationQueryArgs Arguments for ShareNotification/query (RFC 9670 §4.4). Returns an ordered list of ShareNotification ids.
type ShareNotificationQueryArgs struct {
	AccountID string `json:"accountId"` // The account to query share notifications from.
	Sort []map[string]any `json:"sort,omitempty"` // Sort criteria. Each Comparator has a property (e.g. created) and optional isAscending (default true).
	Position *int64 `json:"position,omitempty"` // 0-based index of the first result to return.
	Anchor *string `json:"anchor,omitempty"` // A ShareNotificationId to anchor the result page at.
	AnchorOffset *int64 `json:"anchorOffset,omitempty"` // Offset from the anchor (may be negative).
	Limit *int64 `json:"limit,omitempty"` // Maximum number of ids to return.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the total number of share notifications.
}
