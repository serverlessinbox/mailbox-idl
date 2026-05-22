// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookGetResponse AddressBook/get response
type AddressBookGetResponse struct {
	AccountID string `json:"accountId"` // The account the address books belong to.
	State string `json:"state"` // The current state of the AddressBook type. Pass to AddressBook/changes to detect future changes.
	List []AddressBook `json:"list"` // The list of AddressBook objects that were found.
	NotFound []string `json:"notFound"` // IDs from the request that could not be found.
}
