/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from Mailbox/query (RFC 8621 §3.3 / RFC 8620 §5.5).
 */
export interface MailboxQueryResponse {
  /**
   * The account the query ran against.
   */
  accountId: string;
  /**
   * Opaque state string. Pass to Mailbox/queryChanges to detect future changes.
   */
  queryState: string;
  /**
   * Whether Mailbox/queryChanges can be used with this query.
   */
  canCalculateChanges: boolean;
  /**
   * 0-based index of the first id in the ids array.
   */
  position: number;
  /**
   * The matching MailboxIds in the requested order.
   */
  ids: string[];
  /**
   * Total number of matching mailboxes. Only present if calculateTotal was true.
   */
  total?: number;
  /**
   * The limit applied. Only present if a limit was applied.
   */
  limit?: number;
}
