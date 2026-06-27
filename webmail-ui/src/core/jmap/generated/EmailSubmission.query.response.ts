/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for EmailSubmission/query (RFC 8621 §7.2 / RFC 8620 §5.5).
 */
export interface EmailSubmissionQueryResponse {
  /**
   * The account the query was run against.
   */
  accountId: string;
  /**
   * Server state string for this query result.
   */
  queryState: string;
  /**
   * Whether the server can calculate query changes.
   */
  canCalculateChanges: boolean;
  /**
   * Zero-based index of the first result in ids.
   */
  position: number;
  /**
   * The EmailSubmission ids in the requested window.
   */
  ids: string[];
  /**
   * Total number of results (if calculateTotal was true).
   */
  total?: number | null;
  /**
   * The limit applied to this query.
   */
  limit?: number | null;
}
