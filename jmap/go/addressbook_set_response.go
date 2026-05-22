// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookSetResponse Response from AddressBook/set (RFC 9610 §5.3).
type AddressBookSetResponse struct {
	AccountID string `json:"accountId"` // The account the changes were applied to.
	OldState *string `json:"oldState,omitempty"` // The AddressBook state before this set, or null if the server cannot calculate it.
	NewState string `json:"newState"` // The AddressBook state after this set.
	Created map[string]AddressBook `json:"created,omitempty"` // Successfully created address books, keyed by client creation id.
	Updated map[string]*AddressBook `json:"updated,omitempty"` // Map of successfully updated AddressBookId to the updated object (or null if unchanged properties are not returned).
	Destroyed []string `json:"destroyed,omitempty"` // AddressBookIds that were successfully destroyed.
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Creation ids that failed, with a SetError.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // AddressBookIds that failed to update, with a SetError.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // AddressBookIds that failed to destroy, with a SetError.
}
