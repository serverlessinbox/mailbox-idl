// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// PrincipalGetResponse Principal/get response
type PrincipalGetResponse struct {
	AccountID string `json:"accountId"` // The account the principals belong to.
	State string `json:"state"` // The current state of the Principal type. Pass to Principal/changes to detect future changes.
	List []Principal `json:"list"` // The list of Principal objects that were found.
	NotFound []string `json:"notFound"` // IDs from the request that could not be found.
}
