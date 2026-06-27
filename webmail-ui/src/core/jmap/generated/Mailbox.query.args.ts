/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Mailbox/query (RFC 8621 §3.3). Returns an ordered list of Mailbox ids matching a filter.
 */
export interface MailboxQueryArgs {
  /**
   * The account to query mailboxes from.
   */
  accountId: string;
  /**
   * Filter conditions. Supported properties: parentId (MailboxId|null), name (String), role (String|null), hasAnyRole (Boolean), isSubscribed (Boolean).
   */
  filter?: {
    [k: string]: unknown;
  };
  /**
   * Sort criteria. Each Comparator has a property (e.g. name, sortOrder) and optional isAscending (default true).
   */
  sort?:
    | {
        property: string;
        isAscending?: boolean;
        [k: string]: unknown;
      }[]
    | null;
  /**
   * 0-based index of the first result to return.
   */
  position?: number;
  /**
   * A MailboxId to anchor the result page at.
   */
  anchor?: string;
  /**
   * Offset from the anchor (may be negative).
   */
  anchorOffset?: number;
  /**
   * Maximum number of ids to return.
   */
  limit?: number;
  /**
   * If true, return the total number of matching mailboxes.
   */
  calculateTotal?: boolean;
}
