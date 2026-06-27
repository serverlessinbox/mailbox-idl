/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface MailboxGetResponse {
  /**
   * The account the mailboxes belong to.
   */
  accountId: string;
  /**
   * The current state of the Mailbox type. Pass to Mailbox/changes to detect future changes.
   */
  state: string;
  /**
   * The list of Mailbox objects that were found.
   */
  list: (MailboxBase & {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^sib:".
     */
    [k: string]: unknown;
  })[];
  /**
   * IDs from the request that could not be found.
   */
  notFound?: string[];
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
