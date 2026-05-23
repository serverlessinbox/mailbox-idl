// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionChangesArgs Arguments for EmailSubmission/changes (RFC 8621 §7.4 / RFC 8620 §5.2).
type EmailSubmissionChangesArgs struct {
	AccountID string `json:"accountId"` // The account to get EmailSubmission changes for.
	SinceState string `json:"sinceState"` // The state to get changes since.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of changes to return.
}
