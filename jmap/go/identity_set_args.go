// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// IdentitySetArgs Arguments for Identity/set (RFC 8621 §6.3). Clients may only update identities; create and destroy are server-controlled.
type IdentitySetArgs struct {
	AccountID string `json:"accountId"` // The account to update Identity objects in.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard on Identity state.
	Create map[string]any `json:"create,omitempty"` // Map of creation id to Identity create objects. This server does not support client-initiated creation.
	Update map[string]IdentityUpdate `json:"update,omitempty"` // Map of Identity id to IdentityUpdate patch objects.
	Destroy []string `json:"destroy,omitempty"` // Ids to destroy. This server does not support client-initiated destruction.
}
