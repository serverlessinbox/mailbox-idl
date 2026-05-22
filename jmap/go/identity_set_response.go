// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// IdentitySetResponse Response for Identity/set (RFC 8621 §6.3 / RFC 8620 §5.3).
type IdentitySetResponse struct {
	AccountID string `json:"accountId"` // The account the set operation was performed on.
	OldState *string `json:"oldState"` // The Identity state before this call, or null if no prior state existed.
	NewState string `json:"newState"` // The Identity state after this call.
	Created map[string]Identity `json:"created,omitempty"` // Map of creation id to the created Identity object (server-initiated only).
	Updated map[string]interface{} `json:"updated,omitempty"` // Map of id to the updated Identity object (or null if unchanged properties were not returned).
	Destroyed []string `json:"destroyed,omitempty"` // Ids of Identity objects that were successfully destroyed (server-initiated only).
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Map of creation id to SetError for each failed create.
	NotUpdated map[string]SetError `json:"notUpdated,omitempty"` // Map of id to SetError for each failed update.
	NotDestroyed map[string]SetError `json:"notDestroyed,omitempty"` // Map of id to SetError for each failed destroy.
}
