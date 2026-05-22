// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookChangesArgs AddressBook/changes args
type AddressBookChangesArgs struct {
	AccountID string `json:"accountId"` // The account to fetch address book changes for.
	SinceState string `json:"sinceState"` // The state string from the last AddressBook/get or AddressBook/changes response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
}
