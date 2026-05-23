// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

// EmailImportResponse Response for Email/import (RFC 8621 §5.4).
type EmailImportResponse struct {
	AccountID string `json:"accountId"` // The account the emails were imported into.
	OldState *string `json:"oldState"` // The state before the import.
	NewState string `json:"newState"` // The state after the import.
	Created map[string]map[string]any `json:"created,omitempty"` // Map of creation id to created Email object (subset of properties).
	NotCreated map[string]SetError `json:"notCreated,omitempty"` // Map of creation id to SetError for failed imports.
}
