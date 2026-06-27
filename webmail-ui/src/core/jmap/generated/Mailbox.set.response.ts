/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from Mailbox/set (RFC 8621 §3.5).
 */
export interface MailboxSetResponse {
  /**
   * The account the changes were applied to.
   */
  accountId: string;
  /**
   * The Mailbox state before this set, or null if the server cannot calculate it.
   */
  oldState?: string | null;
  /**
   * The Mailbox state after this set.
   */
  newState: string;
  /**
   * Successfully created mailboxes, keyed by client creation id.
   */
  created?: {
    [k: string]: MailboxBase & {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^sib:".
       */
      [k: string]: unknown;
    };
  } | null;
  /**
   * Map of successfully updated MailboxId to the updated object (or null if unchanged properties are not returned).
   */
  updated?: {
    [k: string]:
      | (MailboxBase & {
          /**
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^sib:".
           */
          [k: string]: unknown;
        })
      | null;
  } | null;
  /**
   * MailboxIds that were successfully destroyed.
   */
  destroyed?: string[] | null;
  /**
   * Creation ids that failed, with a SetError.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
  /**
   * MailboxIds that failed to update, with a SetError.
   */
  notUpdated?: {
    [k: string]: SetError;
  } | null;
  /**
   * MailboxIds that failed to destroy, with a SetError.
   */
  notDestroyed?: {
    [k: string]: SetError;
  } | null;
}
/**
 * Base Mailbox shape used as the allOf anchor for MailboxExt (allows vendor-prefixed properties).
 */
export interface MailboxBase {
  /**
   * The mailbox id (server-set, immutable).
   */
  id: string;
  /**
   * The account this mailbox belongs to (server-set).
   */
  accountId?: string;
  /**
   * User-visible name of the mailbox.
   */
  name?: string;
  /**
   * System role (inbox, trash, drafts, etc.), or null for user-created mailboxes.
   */
  role?: string | null;
  /**
   * Id of the parent mailbox, or null if top-level.
   */
  parentId?: string | null;
  /**
   * Client sort-order hint; lower values sort first.
   */
  sortOrder?: number;
  /**
   * Whether the user may delete this mailbox (server-set).
   */
  deletable?: boolean;
  /**
   * Total number of emails in the mailbox (server-set).
   */
  totalEmails?: number;
  /**
   * Number of emails without the \Seen keyword (server-set).
   */
  unreadEmails?: number;
  /**
   * Total number of threads with at least one email in this mailbox, or null if not supported (server-set).
   */
  totalThreads?: number | null;
  /**
   * Number of threads with at least one unread email in this mailbox, or null if not supported (server-set).
   */
  unreadThreads?: number | null;
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
