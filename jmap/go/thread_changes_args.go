// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ThreadChangesArgs Arguments for Thread/changes (RFC 8621 §2.2 / RFC 8620 §5.2). Returns thread ids changed since a given state.
type ThreadChangesArgs struct {
	AccountID string `json:"accountId"` // The account to get Thread changes for.
	SinceState string `json:"sinceState"` // The state to get changes since.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return.
}
