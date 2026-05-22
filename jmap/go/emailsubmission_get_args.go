// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionGetArgs Arguments for EmailSubmission/get (RFC 8621 §7.1 / RFC 8620 §5.1). Fetches EmailSubmission objects.
type EmailSubmissionGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch EmailSubmission objects from.
	IDs []string `json:"ids,omitempty"` // Submission ids to fetch. If null, returns all.
	Properties []string `json:"properties,omitempty"` // EmailSubmission properties to return. Defaults to all properties.
}
