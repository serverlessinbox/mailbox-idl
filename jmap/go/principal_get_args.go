// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// PrincipalGetArgs Principal/get args
type PrincipalGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch principals from.
	IDs []string `json:"ids,omitempty"` // IDs of specific principals to fetch. Null or omitted to fetch all principals.
	Properties []string `json:"properties,omitempty"` // Principal properties to include in the response. Null or omitted for all properties.
}
