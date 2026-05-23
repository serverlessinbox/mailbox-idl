// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// ContactCardChangesArgs ContactCard/changes args
type ContactCardChangesArgs struct {
	AccountID string `json:"accountId"` // The account to fetch contact card changes for.
	SinceState string `json:"sinceState"` // The state string from the last ContactCard/get or ContactCard/changes response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
}
