/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ContactCardQueryChangesResponse {
  /**
   * The account these query changes belong to.
   */
  accountId: string;
  /**
   * The queryState this response starts from (matches sinceQueryState from request).
   */
  oldQueryState: string;
  /**
   * The current queryState. Pass to the next ContactCard/queryChanges call.
   */
  newQueryState: string;
  /**
   * If true, more changes exist beyond maxChanges. Call again with newQueryState.
   */
  hasMoreChanges: boolean;
  /**
   * ContactCardIds that are no longer in the query result set.
   */
  removed: string[];
  /**
   * Contact cards that are now in the result set, with their new positions.
   */
  added: {
    /**
     * Identifies a ContactCard object (RFC 9610).
     */
    id: string;
    index: number;
  }[];
  /**
   * Updated total count of results (if calculateTotal was true in the original query).
   */
  total?: number;
}
