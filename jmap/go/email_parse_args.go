// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailParseArgs Arguments for Email/parse (RFC 8621 §5.5). Parses blobs as RFC 5322 messages without importing them.
type EmailParseArgs struct {
	AccountID string `json:"accountId"` // The account whose blob store to parse from.
	BlobIDs []string `json:"blobIds"` // Blob ids of the messages to parse.
	Properties []string `json:"properties,omitempty"` // Email properties to return. Defaults to all properties.
	BodyProperties []string `json:"bodyProperties,omitempty"` // Body part properties to include.
	FetchTextBodyValues *bool `json:"fetchTextBodyValues,omitempty"` // If true, include values for text/plain body parts.
	FetchHTMLBodyValues *bool `json:"fetchHTMLBodyValues,omitempty"` // If true, include values for text/html body parts.
	FetchAllBodyValues *bool `json:"fetchAllBodyValues,omitempty"` // If true, include values for all body parts.
	MaxBodyValueBytes *int64 `json:"maxBodyValueBytes,omitempty"` // Truncate body values to this byte length.
}
