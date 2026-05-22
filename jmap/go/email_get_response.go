// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailGetResponse Email/get response
type EmailGetResponse struct {
	AccountID string `json:"accountId"` // The account the emails belong to.
	State string `json:"state"` // The current state of the Email type. Pass to Email/changes to detect future changes.
	List []EmailExt `json:"list"` // The list of Email objects that were requested and found.
	NotFound []string `json:"notFound,omitempty"` // IDs from the request that could not be found, or null if all were found.
}
