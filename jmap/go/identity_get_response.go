// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// IdentityGetResponse Response for Identity/get (RFC 8621 §6.1 / RFC 8620 §5.1).
type IdentityGetResponse struct {
	AccountID string `json:"accountId"` // The account the Identity objects belong to.
	State string `json:"state"` // Current Identity state, used in subsequent /changes calls.
	List []Identity `json:"list"` // The requested Identity objects.
	NotFound []string `json:"notFound,omitempty"` // Ids that were not found.
}
