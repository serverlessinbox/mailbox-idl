/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface MailboxQueryChangesResponse {
  /**
   * The account these query changes belong to.
   */
  accountId: string;
  /**
   * The queryState this response starts from (matches sinceQueryState from request).
   */
  oldQueryState: string;
  /**
   * The current queryState. Pass to the next Mailbox/queryChanges call.
   */
  newQueryState: string;
  /**
   * If true, more changes exist beyond maxChanges. Call again with newQueryState.
   */
  hasMoreChanges: boolean;
  /**
   * MailboxIds that are no longer in the query result set.
   */
  removed: string[];
  /**
   * Mailboxes that are now in the result set, with their new positions.
   */
  added: {
    /**
     * Identifies a Mailbox object (RFC 8621 §3).
     */
    id: string;
    index: number;
  }[];
  /**
   * Updated total count of results (if calculateTotal was true in the original query).
   */
  total?: number;
  /**
   * Identifies a Mailbox object (RFC 8621 §3).
   */
  upToId?: string;
}
