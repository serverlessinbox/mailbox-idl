// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ThreadGetResponse Thread/get response
type ThreadGetResponse struct {
	AccountID string `json:"accountId"` // The account the threads belong to.
	State string `json:"state"` // The current state of the Thread type.
	List []interface{} `json:"list"` // The list of Thread objects that were found.
	NotFound []string `json:"notFound,omitempty"` // IDs from the request that could not be found.
}
