// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardGetArgs ContactCard/get args
type ContactCardGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch contact cards from.
	IDs []string `json:"ids,omitempty"` // IDs of specific contact cards to fetch. Null or omitted to fetch all contact cards.
	Properties []string `json:"properties,omitempty"` // ContactCard properties to include in the response. Null or omitted for all properties.
}
