// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// PrincipalSetResponse Response from Principal/set (RFC 9670 §3.3).
type PrincipalSetResponse struct {
	AccountID string `json:"accountId"` // The account the changes were applied to.
	OldState *string `json:"oldState,omitempty"` // The Principal state before this set, or null if the server cannot calculate it.
	NewState string `json:"newState"` // The Principal state after this set.
	Created map[string]Principal `json:"created,omitempty"` // Successfully created principals (typically empty — creation is server-managed).
	Updated map[string]*Principal `json:"updated,omitempty"` // Map of successfully updated PrincipalId to the updated object (or null if unchanged properties are not returned).
	Destroyed []string `json:"destroyed,omitempty"` // PrincipalIds that were successfully destroyed (typically empty — destruction is server-managed).
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Creation ids that failed, with a SetError.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // PrincipalIds that failed to update, with a SetError.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // PrincipalIds that failed to destroy, with a SetError.
}
