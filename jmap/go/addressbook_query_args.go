// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookQueryArgs Arguments for AddressBook/query (RFC 9610 §5.4). Returns an ordered list of AddressBook ids matching a filter.
type AddressBookQueryArgs struct {
	AccountID string `json:"accountId"` // The account to query address books from.
	Filter map[string]interface{} `json:"filter,omitempty"` // Filter conditions. Supported properties: isSubscribed (Boolean).
	Sort []map[string]interface{} `json:"sort,omitempty"` // Sort criteria. Each Comparator has a property (e.g. name) and optional isAscending (default true).
	Position *int64 `json:"position,omitempty"` // 0-based index of the first result to return.
	Anchor *string `json:"anchor,omitempty"` // An AddressBookId to anchor the result page at.
	AnchorOffset *int64 `json:"anchorOffset,omitempty"` // Offset from the anchor (may be negative).
	Limit *int64 `json:"limit,omitempty"` // Maximum number of ids to return.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the total number of matching address books.
}
