/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for Identity/get (RFC 8621 §6.1 / RFC 8620 §5.1).
 */
export interface IdentityGetResponse {
  /**
   * The account the Identity objects belong to.
   */
  accountId: string;
  /**
   * Current Identity state, used in subsequent /changes calls.
   */
  state: string;
  /**
   * The requested Identity objects.
   */
  list: Identity[];
  /**
   * Ids that were not found.
   */
  notFound?: string[] | null;
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
