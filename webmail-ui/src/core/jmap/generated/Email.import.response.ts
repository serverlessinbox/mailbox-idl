/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for Email/import (RFC 8621 §5.4).
 */
export interface EmailImportResponse {
  /**
   * The account the emails were imported into.
   */
  accountId: string;
  /**
   * The state before the import.
   */
  oldState: string | null;
  /**
   * The state after the import.
   */
  newState: string;
  /**
   * Map of creation id to created Email object (subset of properties).
   */
  created?: {
    [k: string]: {
      /**
       * An opaque server-assigned identifier string (RFC 8620 §1.2).
       */
      id: string;
      /**
       * Identifies a binary blob (RFC 8620 §6).
       */
      blobId: string;
      /**
       * An opaque server-assigned identifier string (RFC 8620 §1.2).
       */
      threadId: string;
      size: number;
    };
  } | null;
  /**
   * Map of creation id to SetError for failed imports.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
}
/**
 * Describes why a create, update or destroy operation failed (RFC 8620 §5.3).
 */
export interface SetError {
  type: string;
  description?: string | null;
  properties?: string[] | null;
  [k: string]: unknown;
}
