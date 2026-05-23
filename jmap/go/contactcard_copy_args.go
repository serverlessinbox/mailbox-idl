// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardCopyArgs Arguments for ContactCard/copy (RFC 9610 §6.6). Copies contact cards between accounts.
type ContactCardCopyArgs struct {
	FromAccountID string `json:"fromAccountId"` // The account to copy contact cards from.
	IfFromInState *string `json:"ifFromInState,omitempty"` // Optimistic concurrency guard on the source ContactCard state.
	AccountID string `json:"accountId"` // The account to copy contact cards into.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard on the destination ContactCard state.
	Create map[string]map[string]any `json:"create"` // Map of client-assigned creation ids to objects describing the copy.
	OnSuccessDestroyOriginal *bool `json:"onSuccessDestroyOriginal,omitempty"` // If true, destroy original contact cards on success. Default: false.
	DestroyFromIfInState *string `json:"destroyFromIfInState,omitempty"` // Guard on source state when destroying originals.
}
