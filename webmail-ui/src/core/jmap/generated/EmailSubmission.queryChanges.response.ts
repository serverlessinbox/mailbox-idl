/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for EmailSubmission/queryChanges (RFC 8621 §7.3 / RFC 8620 §5.6).
 */
export interface EmailSubmissionQueryChangesResponse {
  /**
   * The account the query changes are for.
   */
  accountId: string;
  /**
   * The sinceQueryState value passed in the request.
   */
  oldQueryState: string;
  /**
   * The current query state after these changes.
   */
  newQueryState: string;
  /**
   * New total number of results (if calculateTotal was true).
   */
  total?: number | null;
  /**
   * Ids removed from the query results.
   */
  removed: string[];
  /**
   * Items added to the query results with their new index.
   */
  added: {
    /**
     * An opaque server-assigned identifier string (RFC 8620 §1.2).
     */
    id: string;
    index: number;
  }[];
}
