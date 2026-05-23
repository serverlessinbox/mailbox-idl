// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardSetArgs Arguments for ContactCard/set (RFC 9610 §6.3). Creates, updates, or destroys ContactCard objects.
type ContactCardSetArgs struct {
	AccountID string `json:"accountId"` // The account to apply changes to.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard. Fails with stateMismatch if the ContactCard state differs.
	Create map[string]ContactCardCreate `json:"create,omitempty"` // Map of client-assigned creation ids to ContactCardCreate objects.
	Update map[string]PatchObject `json:"update,omitempty"` // Map of ContactCardId to PatchObject. Only explicitly listed properties are changed.
	Destroy []string `json:"destroy,omitempty"` // ContactCardIds to delete.
}
