// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailCopyArgs Arguments for Email/copy (RFC 8621 §5.7 / RFC 8620 §5.4). Copies emails between accounts.
type EmailCopyArgs struct {
	FromAccountID string `json:"fromAccountId"` // The account to copy emails from.
	IfFromInState *string `json:"ifFromInState,omitempty"` // Optimistic concurrency guard on the source Email state.
	AccountID string `json:"accountId"` // The account to copy emails into.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard on the destination Email state.
	Create map[string]map[string]interface{} `json:"create"` // Map of client-assigned creation ids to objects describing the copy.
	OnSuccessDestroyOriginal *bool `json:"onSuccessDestroyOriginal,omitempty"` // If true, destroy original emails on success. Default: false.
	DestroyFromIfInState *string `json:"destroyFromIfInState,omitempty"` // Guard on source state when destroying originals.
}
