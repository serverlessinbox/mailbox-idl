/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface EmailQueryResponse {
  /**
   * The account this query result belongs to.
   */
  accountId: string;
  /**
   * Opaque state string for this query. Pass to Email/queryChanges to detect changes to the result set.
   */
  queryState: string;
  /**
   * Whether Email/queryChanges is supported for this query.
   */
  canCalculateChanges: boolean;
  /**
   * Zero-based index of the first ID in the full result list.
   */
  position: number;
  /**
   * EmailIds of the results for this page, in the requested sort order.
   */
  ids: string[];
  /**
   * Total number of matching emails. Only present when calculateTotal was true.
   */
  total?: number;
  /**
   * The limit applied by the server (may be lower than the requested limit).
   */
  limit?: number;
  /**
   * The anchor EmailId used for this page, if anchor-based pagination was requested.
   */
  anchor?: string;
  /**
   * Opaque cursor for the next page of results. null or absent means this is the last page. See https://specs.serverlessinbox.com/page-token
   */
  pageToken?: string | null;
  [k: string]: unknown;
}
