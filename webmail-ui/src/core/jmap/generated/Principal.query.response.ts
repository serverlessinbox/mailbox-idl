/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from Principal/query (RFC 9670 §3.4).
 */
export interface PrincipalQueryResponse {
  /**
   * The account the query ran against.
   */
  accountId: string;
  /**
   * Opaque state string. Pass to Principal/queryChanges to detect future changes.
   */
  queryState: string;
  /**
   * Whether Principal/queryChanges can be used with this query.
   */
  canCalculateChanges: boolean;
  /**
   * 0-based index of the first id in the ids array.
   */
  position: number;
  /**
   * The matching PrincipalIds in the requested order.
   */
  ids: string[];
  /**
   * Total number of matching principals. Only present if calculateTotal was true.
   */
  total?: number;
  /**
   * The limit applied. Only present if a limit was applied.
   */
  limit?: number;
}
