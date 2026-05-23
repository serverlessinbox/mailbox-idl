// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailParseResponse Response for Email/parse (RFC 8621 §5.5).
type EmailParseResponse struct {
	AccountID string `json:"accountId"` // The account the blobs were parsed from.
	Parsed map[string]map[string]any `json:"parsed,omitempty"` // Map of blob id to parsed Email object.
	NotParsable []string `json:"notParsable,omitempty"` // Blob ids that could not be parsed as RFC 5322 messages.
	NotFound []string `json:"notFound,omitempty"` // Blob ids not found in the account.
}
