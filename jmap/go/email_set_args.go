// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSetArgs Email/set args
type EmailSetArgs struct {
	AccountID string `json:"accountId"` // The account to apply changes to.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard; the call fails with stateMismatch if the Email state has changed.
	Create map[string]EmailExt `json:"create,omitempty"` // Map of client-assigned creation ids to Email objects.
	Update map[string]PatchObject `json:"update,omitempty"` // Map of EmailId to PatchObject.
	Destroy []string `json:"destroy,omitempty"` // List of EmailIds to permanently delete.
}
