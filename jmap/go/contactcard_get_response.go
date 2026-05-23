// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardGetResponse ContactCard/get response
type ContactCardGetResponse struct {
	AccountID string `json:"accountId"` // The account the contact cards belong to.
	State string `json:"state"` // The current state of the ContactCard type. Pass to ContactCard/changes to detect future changes.
	List []ContactCard `json:"list"` // The list of ContactCard objects that were found.
	NotFound []string `json:"notFound"` // IDs from the request that could not be found.
}
