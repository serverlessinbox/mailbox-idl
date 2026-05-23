// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionSetResponse Response for EmailSubmission/set (RFC 8621 §7.5 / RFC 8620 §5.3).
type EmailSubmissionSetResponse struct {
	AccountID string `json:"accountId"` // The account the set operation was performed on.
	OldState *string `json:"oldState"` // The EmailSubmission state before this call, or null if no prior state existed.
	NewState string `json:"newState"` // The EmailSubmission state after this call.
	Created map[string]EmailSubmission `json:"created,omitempty"` // Map of creation id to the created EmailSubmission object.
	Updated map[string]any `json:"updated,omitempty"` // Map of id to the updated EmailSubmission object (or null if unchanged properties were not returned).
	Destroyed []string `json:"destroyed,omitempty"` // Ids of EmailSubmission objects that were successfully destroyed.
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Map of creation id to SetError for each failed create.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // Map of id to SetError for each failed update.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // Map of id to SetError for each failed destroy.
}
