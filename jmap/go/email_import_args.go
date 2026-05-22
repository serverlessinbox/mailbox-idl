// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailImportArgs Arguments for Email/import (RFC 8621 §5.4). Imports raw RFC 5322 messages from blobs.
type EmailImportArgs struct {
	AccountID string `json:"accountId"` // The account to import into.
	IfInState *string `json:"ifInState,omitempty"` // Optimistic concurrency guard on the Email state.
	Emails map[string]ImportEmailObject `json:"emails"` // Map of client-assigned creation ids to ImportEmailObject.
}
