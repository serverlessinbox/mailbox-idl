/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface PrincipalQueryChangesResponse {
  /**
   * The account these query changes belong to.
   */
  accountId: string;
  /**
   * The queryState this response starts from (matches sinceQueryState from request).
   */
  oldQueryState: string;
  /**
   * The current queryState. Pass to the next Principal/queryChanges call.
   */
  newQueryState: string;
  /**
   * If true, more changes exist beyond maxChanges. Call again with newQueryState.
   */
  hasMoreChanges: boolean;
  /**
   * PrincipalIds that are no longer in the query result set.
   */
  removed: string[];
  /**
   * Principals that are now in the result set, with their new positions.
   */
  added: {
    /**
     * Identifies a Principal object (RFC 9670).
     */
    id: string;
    index: number;
  }[];
  /**
   * Updated total count of results (if calculateTotal was true in the original query).
   */
  total?: number;
}
