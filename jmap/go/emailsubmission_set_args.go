// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionSetArgs Arguments for EmailSubmission/set (RFC 8621 §7.5). Creates, updates, and destroys EmailSubmission objects.
type EmailSubmissionSetArgs struct {
	AccountID string `json:"accountId"` // The account to create, update, or destroy EmailSubmission objects in.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard on EmailSubmission state.
	Create map[string]EmailSubmissionCreate `json:"create,omitempty"` // Map of creation id to EmailSubmissionCreate objects.
	Update map[string]PatchObject `json:"update,omitempty"` // Map of submission id to patch objects (RFC 8620 §5.3 patch).
	Destroy []string `json:"destroy,omitempty"` // Ids of EmailSubmission objects to destroy.
	OnSuccessUpdateEmail map[string]PatchObject `json:"onSuccessUpdateEmail,omitempty"` // Map of submission id (or creation id reference) to Email patch applied on successful send.
	OnSuccessDestroyEmail []string `json:"onSuccessDestroyEmail,omitempty"` // List of submission ids (or creation id references) whose associated Emails should be destroyed on successful send.
}
