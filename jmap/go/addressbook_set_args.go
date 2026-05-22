// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// AddressBookSetArgs Arguments for AddressBook/set (RFC 9610 §5.3). Creates, updates, or destroys AddressBook objects.
type AddressBookSetArgs struct {
	AccountID string `json:"accountId"` // The account to apply changes to.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard. Fails with stateMismatch if the AddressBook state differs.
	Create map[string]AddressBookCreate `json:"create,omitempty"` // Map of client-assigned creation ids to AddressBookCreate objects.
	Update map[string]PatchObject `json:"update,omitempty"` // Map of AddressBookId to PatchObject. Only explicitly listed properties are changed.
	Destroy []string `json:"destroy,omitempty"` // AddressBookIds to delete.
	OnDestroyRemoveContents *bool `json:"onDestroyRemoveContents,omitempty"` // If true, also destroy all ContactCards in the address book. Default false.
}
