// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// PrincipalSetArgs Arguments for Principal/set (RFC 9670 §3.3). Only self-updates are allowed; create and destroy are not permitted for most principals.
type PrincipalSetArgs struct {
	AccountID string `json:"accountId"` // The account to apply changes to.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard. Fails with stateMismatch if the Principal state differs.
	Create map[string]interface{} `json:"create,omitempty"` // Always results in notCreated for server-managed principals.
	Update map[string]PatchObject `json:"update,omitempty"` // Map of PrincipalId to PatchObject. Only the calling user's own principal may be updated.
	Destroy []string `json:"destroy,omitempty"` // Always results in notDestroyed for server-managed principals.
}
