// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// IdentityChangesArgs Arguments for Identity/changes (RFC 8621 §6.2 / RFC 8620 §5.2).
type IdentityChangesArgs struct {
	AccountID string `json:"accountId"` // The account to get Identity changes for.
	SinceState string `json:"sinceState"` // The state to get changes since.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return.
}
