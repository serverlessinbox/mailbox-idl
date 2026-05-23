// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// PrincipalChangesArgs Principal/changes args
type PrincipalChangesArgs struct {
	AccountID string `json:"accountId"` // The account to fetch principal changes for.
	SinceState string `json:"sinceState"` // The state string from the last Principal/get or Principal/changes response.
	MaxChanges *int64 `json:"maxChanges,omitempty"` // Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
}
