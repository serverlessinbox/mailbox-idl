/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface AddressBookQueryChangesResponse {
  /**
   * The account these query changes belong to.
   */
  accountId: string;
  /**
   * The queryState this response starts from (matches sinceQueryState from request).
   */
  oldQueryState: string;
  /**
   * The current queryState. Pass to the next AddressBook/queryChanges call.
   */
  newQueryState: string;
  /**
   * If true, more changes exist beyond maxChanges. Call again with newQueryState.
   */
  hasMoreChanges: boolean;
  /**
   * AddressBookIds that are no longer in the query result set.
   */
  removed: string[];
  /**
   * Address books that are now in the result set, with their new positions.
   */
  added: {
    /**
     * Identifies an AddressBook object (RFC 9610).
     */
    id: string;
    index: number;
  }[];
  /**
   * Updated total count of results (if calculateTotal was true in the original query).
   */
  total?: number;
}
