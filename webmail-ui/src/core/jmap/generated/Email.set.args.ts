/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface EmailSetArgs {
  /**
   * The account to apply changes to.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard; the call fails with stateMismatch if the Email state has changed.
   */
  ifInState?: string | null;
  /**
   * Map of client-assigned creation ids to Email objects.
   */
  create?: {
    [k: string]: EmailBase & {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^sib:".
       */
      [k: string]: unknown;
    };
  };
  /**
   * Map of EmailId to PatchObject.
   */
  update?: {
    [k: string]: PatchObject;
  };
  /**
   * List of EmailIds to permanently delete.
   */
  destroy?: readonly string[];
}
/**
 * Base Email shape used as the allOf anchor for EmailExt (allows vendor-prefixed properties).
 */
export interface EmailBase {
  /**
   * The email id (server-set, immutable).
   */
  id: string;
  /**
   * Blob id of the raw RFC 5322 message (server-set).
   */
  blobId?: string;
  /**
   * Thread this email belongs to (server-set).
   */
  threadId?: string;
  /**
   * Id[Boolean] map — MailboxId → true means the email is in that mailbox (RFC 8621 §4.1.1).
   */
  mailboxIds?: {
    [k: string]: boolean;
  };
  keywords?: Keywords;
  /**
   * Size in bytes of the raw RFC 5322 message (server-set).
   */
  size?: number;
  /**
   * Date/time the message was received by the server.
   */
  receivedAt?: string;
  /**
   * Date/time from the Date header (RFC 8621 §4.1.3).
   */
  sentAt?: string | null;
  /**
   * Decoded Subject header value, or null if absent.
   */
  subject?: string | null;
  /**
   * Array of Message-ID values (RFC 8621 §4.1.3), or null if absent.
   */
  messageId?: readonly string[] | null;
  /**
   * Array of In-Reply-To values (RFC 8621 §4.1.3), or null if absent.
   */
  inReplyTo?: readonly string[] | null;
  /**
   * Array of References values (RFC 8621 §4.1.3), or null if absent.
   */
  references?: readonly string[] | null;
  /**
   * Sender header addresses (RFC 8621 §4.1.2.3), or null if absent.
   */
  sender?: EmailAddress[] | null;
  /**
   * From header addresses (RFC 8621 §4.1.2.3), or null if absent.
   */
  from?: EmailAddress[] | null;
  /**
   * To header addresses (RFC 8621 §4.1.2.3), or null if absent.
   */
  to?: EmailAddress[] | null;
  /**
   * Cc header addresses (RFC 8621 §4.1.2.3), or null if absent.
   */
  cc?: EmailAddress[] | null;
  /**
   * Bcc header addresses (RFC 8621 §4.1.2.3), or null if absent.
   */
  bcc?: EmailAddress[] | null;
  /**
   * Reply-To header addresses (RFC 8621 §4.1.2.3), or null if absent.
   */
  replyTo?: EmailAddress[] | null;
  /**
   * Plain-text excerpt of the message body (at most 256 characters, server-set).
   */
  preview?: string;
  /**
   * True if the message has at least one attachment (server-set).
   */
  hasAttachment?: boolean;
  /**
   * Ordered list of all raw message header fields (RFC 8621 §4.1.3).
   */
  headers?: EmailHeader[];
  /**
   * Full MIME tree of the message as a single EmailBodyPart (RFC 8621 §4.1.4). Only present when requested via bodyProperties.
   */
  bodyStructure?: EmailBodyPart | null;
  /**
   * PartId → EmailBodyValue map (RFC 8621 §4.1.4). Populated only when fetchTextBodyValues, fetchHTMLBodyValues, or fetchAllBodyValues is true.
   */
  bodyValues?: {
    [k: string]: EmailBodyValue;
  } | null;
  /**
   * text/plain body parts in display order (RFC 8621 §4.1.4).
   */
  textBody?: EmailBodyPart[] | null;
  /**
   * text/html body parts in display order (RFC 8621 §4.1.4).
   */
  htmlBody?: EmailBodyPart[] | null;
  /**
   * Non-inline attachment parts (RFC 8621 §4.1.4).
   */
  attachments?: EmailBodyPart[] | null;
}
/**
 * IMAP keywords set on this email.
 */
export interface Keywords {
  [k: string]: boolean;
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
 * A single raw message header field (RFC 8621 §4.1.3). Ordering is preserved.
 */
export interface EmailHeader {
  /**
   * Header field name (case-insensitive per RFC 5322).
   */
  name: string;
  /**
   * Header field value (decoded, with folding whitespace collapsed).
   */
  value: string;
}
/**
 * A single MIME body part descriptor (RFC 8621 §4.1.4). Used in textBody, htmlBody, attachments, and bodyStructure.
 */
export interface EmailBodyPart {
  /**
   * Part identifier, unique within the email. Present only on leaf parts.
   */
  partId?: string | null;
  /**
   * Blob id for this part's content. Null for multipart/* container parts.
   */
  blobId?: string | null;
  /**
   * Size of the content in octets (server-set).
   */
  size?: number;
  /**
   * MIME headers for this part.
   */
  headers?: EmailHeader[];
  /**
   * Filename from Content-Disposition or Content-Type name parameter, or null.
   */
  name?: string | null;
  /**
   * MIME content type (e.g. text/plain).
   */
  type?: string;
  /**
   * Character set for text/* parts, or null.
   */
  charset?: string | null;
  /**
   * Content-Disposition value (inline or attachment), or null.
   */
  disposition?: string | null;
  /**
   * Content-ID value without angle brackets, or null.
   */
  cid?: string | null;
  /**
   * Content-Language values, or null.
   */
  language?: readonly string[] | null;
  /**
   * Content-Location URI, or null.
   */
  location?: string | null;
  /**
   * Sub-parts for multipart/* types, or null for non-multipart parts.
   */
  subParts?: EmailBodyPart[] | null;
}
/**
 * The decoded value of an email body part (RFC 8621 §4.1.4). Included only when the corresponding fetch flag is set.
 */
export interface EmailBodyValue {
  /**
   * The decoded body part content as a string.
   */
  value: string;
  /**
   * True if there was a decoding error (e.g. bad Content-Transfer-Encoding).
   */
  isEncodingProblem: boolean;
  /**
   * True if the value was truncated at maxBodyValueBytes.
   */
  isTruncated: boolean;
}
/**
 * JMAP PatchObject: keys are JSON Pointers to properties; values are the new values (or null to remove).
 */
export interface PatchObject {
  /**
   * This interface was referenced by `PatchObject`'s JSON-Schema definition
   * via the `patternProperty` "^/".
   */
  [k: string]: unknown;
}
