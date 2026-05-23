// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// IdentityGetArgs Arguments for Identity/get (RFC 8621 §6.1 / RFC 8620 §5.1). Fetches Identity objects.
type IdentityGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch Identity objects from.
	IDs []string `json:"ids,omitempty"` // Identity ids to fetch. If null, returns all identities.
	Properties []string `json:"properties,omitempty"` // Identity properties to return. Defaults to all properties.
}
