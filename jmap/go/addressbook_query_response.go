// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookQueryResponse Response from AddressBook/query (RFC 9610 §5.4).
type AddressBookQueryResponse struct {
	AccountID string `json:"accountId"` // The account the query ran against.
	QueryState string `json:"queryState"` // Opaque state string. Pass to AddressBook/queryChanges to detect future changes.
	CanCalculateChanges bool `json:"canCalculateChanges"` // Whether AddressBook/queryChanges can be used with this query.
	Position int64 `json:"position"` // 0-based index of the first id in the ids array.
	IDs []string `json:"ids"` // The matching AddressBookIds in the requested order.
	Total *int64 `json:"total,omitempty"` // Total number of matching address books. Only present if calculateTotal was true.
	Limit *int64 `json:"limit,omitempty"` // The limit applied. Only present if a limit was applied.
}
