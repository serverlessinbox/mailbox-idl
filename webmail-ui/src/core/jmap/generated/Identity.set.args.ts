/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Identity/set (RFC 8621 §6.3). Clients may only update identities; create and destroy are server-controlled.
 */
export interface IdentitySetArgs {
  /**
   * The account to update Identity objects in.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard on Identity state.
   */
  ifInState?: string | null;
  /**
   * Map of creation id to Identity create objects. This server does not support client-initiated creation.
   */
  create?: {
    [k: string]: unknown;
  } | null;
  /**
   * Map of Identity id to IdentityUpdate patch objects.
   */
  update?: {
    [k: string]: IdentityUpdate;
  } | null;
  /**
   * Ids to destroy. This server does not support client-initiated destruction.
   */
  destroy?: readonly string[] | null;
}
/**
 * Client-settable fields when updating an Identity (RFC 8621 §6.2). Users cannot change email, id, or mayDelete.
 */
export interface IdentityUpdate {
  /**
   * Display name shown in the From header.
   */
  name?: string;
  /**
   * Reply-To header addresses, or null to remove.
   */
  replyTo?: EmailAddress[] | null;
  /**
   * Bcc addresses added to all outgoing emails, or null to remove.
   */
  bcc?: EmailAddress[] | null;
  /**
   * Plain-text signature appended to outgoing emails.
   */
  textSignature?: string;
  /**
   * HTML signature appended to outgoing emails.
   */
  htmlSignature?: string;
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
