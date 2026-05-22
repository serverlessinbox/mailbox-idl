// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookGetArgs AddressBook/get args
type AddressBookGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch address books from.
	IDs []string `json:"ids,omitempty"` // IDs of specific address books to fetch. Null or omitted to fetch all address books.
	Properties []string `json:"properties,omitempty"` // AddressBook properties to include in the response. Null or omitted for all properties.
}
