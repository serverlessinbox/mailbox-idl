/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ThreadQueryChangesResponse {
  /**
   * The account these query changes belong to.
   */
  accountId: string;
  /**
   * The queryState this response starts from (matches sinceQueryState from request).
   */
  oldQueryState: string;
  /**
   * The current queryState. Pass to the next Thread/queryChanges call.
   */
  newQueryState: string;
  /**
   * If true, more changes exist beyond maxChanges. Call again with newQueryState.
   */
  hasMoreChanges: boolean;
  /**
   * ThreadIds that are no longer in the query result set.
   */
  removed: string[];
  /**
   * Threads that are now in the result set, with their new positions.
   */
  added: {
    /**
     * Identifies a Thread object (RFC 8621 §2).
     */
    id: string;
    index: number;
  }[];
  /**
   * Updated total count of results (if calculateTotal was true in the original query).
   */
  total?: number;
  /**
   * Identifies a Thread object (RFC 8621 §2).
   */
  upToId?: string;
}
