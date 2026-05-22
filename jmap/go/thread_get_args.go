// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ThreadGetArgs Thread/get args
type ThreadGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch threads from.
	IDs []string `json:"ids,omitempty"` // IDs of specific threads to fetch.
	Properties []string `json:"properties,omitempty"` // Thread properties to include. Omit for all properties.
}
