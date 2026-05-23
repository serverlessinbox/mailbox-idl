// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailChangesArgs Email/changes args
type EmailChangesArgs struct {
	AccountID string `json:"accountId"` // The account to fetch changes for.
	SinceState string `json:"sinceState"` // The state string from the last Email/get or Email/changes response. Only changes after this state are returned.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of change records to return. Omit for no limit. If exceeded, hasMoreChanges will be true.
}
