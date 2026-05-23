// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardQueryArgs Arguments for ContactCard/query (RFC 9610 §6.4). Returns an ordered list of ContactCard ids matching a filter.
type ContactCardQueryArgs struct {
	AccountID string `json:"accountId"` // The account to query contact cards from.
	Filter map[string]any `json:"filter,omitempty"` // Filter conditions. Supported properties: inAddressBook (AddressBookId), uid (String), hasMember (String), kind (String), createdBefore/createdAfter (UTCDate), updatedBefore/updatedAfter (UTCDate), text/name/nickname/organization/email/phone/onlineService/address/note (String).
	Sort []map[string]any `json:"sort,omitempty"` // Sort criteria. Each Comparator has a property (e.g. nickname, created, updated) and optional isAscending (default true).
	Position *int64 `json:"position,omitempty"` // 0-based index of the first result to return.
	Anchor *string `json:"anchor,omitempty"` // A ContactCardId to anchor the result page at.
	AnchorOffset *int64 `json:"anchorOffset,omitempty"` // Offset from the anchor (may be negative).
	Limit *int64 `json:"limit,omitempty"` // Maximum number of ids to return.
	CalculateTotal *bool `json:"calculateTotal,omitempty"` // If true, return the total number of matching contact cards.
}
