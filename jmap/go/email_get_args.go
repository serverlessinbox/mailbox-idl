// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailGetArgs Email/get args
type EmailGetArgs struct {
	AccountID string `json:"accountId"` // The account to fetch emails from.
	IDs any `json:"ids,omitempty"` // []string or *ResultRef — set one, leave the other nil.
	Properties []string `json:"properties,omitempty"` // Email properties to include in the response. Omit for all properties.
	BodyProperties []string `json:"bodyProperties,omitempty"` // Properties to include for each body part object. Defaults to a standard set.
	FetchTextBodyValues *bool `json:"fetchTextBodyValues,omitempty"` // If true, fetch the value of text/plain body parts.
	FetchHTMLBodyValues *bool `json:"fetchHTMLBodyValues,omitempty"` // If true, fetch the value of text/html body parts.
	FetchAllBodyValues *bool `json:"fetchAllBodyValues,omitempty"` // If true, fetch all body part values regardless of content type.
	MaxBodyValueBytes *int64 `json:"maxBodyValueBytes,omitempty"` // Truncate body values to this many bytes. 0 means no truncation.
	FetchHeaders []string `json:"fetchHeaders,omitempty"` // List of specific header field names to return as header: values.
	FetchAllHeaders *bool `json:"fetchAllHeaders,omitempty"` // If true, return all raw headers regardless of fetchHeaders list.
}
