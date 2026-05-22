// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardSetResponse Response from ContactCard/set (RFC 9610 §6.3).
type ContactCardSetResponse struct {
	AccountID string `json:"accountId"` // The account the changes were applied to.
	OldState *string `json:"oldState,omitempty"` // The ContactCard state before this set, or null if the server cannot calculate it.
	NewState string `json:"newState"` // The ContactCard state after this set.
	Created map[string]ContactCard `json:"created,omitempty"` // Successfully created contact cards, keyed by client creation id.
	Updated map[string]*ContactCard `json:"updated,omitempty"` // Map of successfully updated ContactCardId to the updated object (or null if unchanged properties are not returned).
	Destroyed []string `json:"destroyed,omitempty"` // ContactCardIds that were successfully destroyed.
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Creation ids that failed, with a SetError.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // ContactCardIds that failed to update, with a SetError.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // ContactCardIds that failed to destroy, with a SetError.
}
