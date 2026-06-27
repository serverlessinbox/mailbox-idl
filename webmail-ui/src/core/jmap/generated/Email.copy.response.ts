/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for Email/copy (RFC 8621 §5.7 / RFC 8620 §5.4).
 */
export interface EmailCopyResponse {
  /**
   * The account the emails were copied from.
   */
  fromAccountId: string;
  /**
   * The account the emails were copied into.
   */
  accountId: string;
  /**
   * The Email state before the copy, or null if the destination account had no prior state.
   */
  oldState: string | null;
  /**
   * The Email state after the copy.
   */
  newState: string;
  /**
   * Map of creation id to created Email object (subset: id, blobId, threadId, size).
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
   * Map of creation id to SetError for failed copies.
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
