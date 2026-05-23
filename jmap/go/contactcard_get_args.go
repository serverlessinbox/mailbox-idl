// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardGetArgs ContactCard/get args
type ContactCardGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch contact cards from.
	IDs StringOrRef `json:"ids,omitempty"` // StringIDs(...) for a literal list, Ref(handle, path) for a result reference.
	Properties []string `json:"properties,omitempty"` // ContactCard properties to include in the response. Null or omitted for all properties.
}
