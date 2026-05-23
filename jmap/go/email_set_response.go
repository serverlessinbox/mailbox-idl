// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSetResponse Email/set response
type EmailSetResponse struct {
	AccountID string `json:"accountId"` // The account the changes were applied to.
	OldState string `json:"oldState"` // The Email state before this set operation.
	NewState string `json:"newState"` // The Email state after this set operation.
	Created map[string]EmailExt `json:"created,omitempty"` // Successfully created emails, keyed by the client-assigned creation id.
	Updated map[string]any `json:"updated,omitempty"` // Map of successfully updated EmailId to null.
	Destroyed []string `json:"destroyed,omitempty"` // IDs of successfully destroyed emails, or null if none.
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Creation ids that failed, with a SetError describing the reason.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // EmailIds that failed to update, with a SetError describing the reason.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // EmailIds that failed to destroy, with a SetError describing the reason.
}
