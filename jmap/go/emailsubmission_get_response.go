// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailSubmissionGetResponse Response for EmailSubmission/get (RFC 8621 §7.1 / RFC 8620 §5.1).
type EmailSubmissionGetResponse struct {
	AccountID string `json:"accountId"` // The account the EmailSubmission objects belong to.
	State string `json:"state"` // Current EmailSubmission state, used in subsequent /changes calls.
	List []EmailSubmission `json:"list"` // The requested EmailSubmission objects.
	NotFound []string `json:"notFound,omitempty"` // Ids that were not found.
}
