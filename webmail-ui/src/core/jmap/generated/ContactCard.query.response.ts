/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from ContactCard/query (RFC 9610 §6.4).
 */
export interface ContactCardQueryResponse {
  /**
   * The account the query ran against.
   */
  accountId: string;
  /**
   * Opaque state string. Pass to ContactCard/queryChanges to detect future changes.
   */
  queryState: string;
  /**
   * Whether ContactCard/queryChanges can be used with this query.
   */
  canCalculateChanges: boolean;
  /**
   * 0-based index of the first id in the ids array.
   */
  position: number;
  /**
   * The matching ContactCardIds in the requested order.
   */
  ids: string[];
  /**
   * Total number of matching contact cards. Only present if calculateTotal was true.
   */
  total?: number;
  /**
   * The limit applied. Only present if a limit was applied.
   */
  limit?: number;
}
