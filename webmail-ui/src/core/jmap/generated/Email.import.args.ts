/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Email/import (RFC 8621 §5.4). Imports raw RFC 5322 messages from blobs.
 */
export interface EmailImportArgs {
  /**
   * The account to import into.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard on the Email state.
   */
  ifInState?: string | null;
  /**
   * Map of client-assigned creation ids to ImportEmailObject.
   */
  emails: {
    [k: string]: ImportEmailObject;
  };
}
/**
 * A single email to import via Email/import (RFC 8621 §5.4).
 */
export interface ImportEmailObject {
  /**
   * Blob id of the raw RFC 5322 message to import.
   */
  blobId: string;
  /**
   * Id[Boolean] map — MailboxId → true. At least one entry required (RFC 8621 §4.8).
   */
  mailboxIds: {
    [k: string]: boolean;
  };
  keywords?: Keywords;
  /**
   * Override for the receivedAt date. If null the server uses the current time.
   */
  receivedAt?: string | null;
}
/**
 * Initial keywords to set on the email.
 */
export interface Keywords {
  [k: string]: boolean;
}
