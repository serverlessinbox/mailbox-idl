/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for Identity/set (RFC 8621 §6.3 / RFC 8620 §5.3).
 */
export interface IdentitySetResponse {
  /**
   * The account the set operation was performed on.
   */
  accountId: string;
  /**
   * The Identity state before this call, or null if no prior state existed.
   */
  oldState: string | null;
  /**
   * The Identity state after this call.
   */
  newState: string;
  /**
   * Map of creation id to the created Identity object (server-initiated only).
   */
  created?: {
    [k: string]: Identity;
  } | null;
  /**
   * Map of id to the updated Identity object (or null if unchanged properties were not returned).
   */
  updated?: {
    [k: string]: Identity | null;
  } | null;
  /**
   * Ids of Identity objects that were successfully destroyed (server-initiated only).
   */
  destroyed?: string[] | null;
  /**
   * Map of creation id to SetError for each failed create.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
  /**
   * Map of id to SetError for each failed update.
   */
  notUpdated?: {
    [k: string]: SetError;
  } | null;
  /**
   * Map of id to SetError for each failed destroy.
   */
  notDestroyed?: {
    [k: string]: SetError;
  } | null;
}
/**
 * A JMAP Identity object (RFC 8621 §6). Represents a From address the user may send from.
 */
export interface Identity {
  /**
   * The identity id (server-set).
   */
  id: string;
  /**
   * Display name shown in the From header.
   */
  name: string;
  /**
   * The email address. Server-set and immutable.
   */
  email: string;
  /**
   * Reply-To header addresses, or null for none.
   */
  replyTo?: EmailAddress[] | null;
  /**
   * Bcc header addresses added to all outgoing emails, or null for none.
   */
  bcc?: EmailAddress[] | null;
  /**
   * Plain-text signature appended to outgoing emails.
   */
  textSignature: string;
  /**
   * HTML signature appended to outgoing emails.
   */
  htmlSignature: string;
  /**
   * Whether the user may delete this identity (server-set).
   */
  mayDelete: boolean;
}
/**
 * An email address with an optional display name (RFC 8621 §4.1.2).
 */
export interface EmailAddress {
  /**
   * Display name, or null if none.
   */
  name?: string | null;
  /**
   * The email address (addr-spec).
   */
  email: string;
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
