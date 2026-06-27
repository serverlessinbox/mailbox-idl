/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from ShareNotification/query (RFC 9670 §4.4).
 */
export interface ShareNotificationQueryResponse {
  /**
   * The account the query ran against.
   */
  accountId: string;
  /**
   * Opaque state string. Pass to ShareNotification/queryChanges to detect future changes.
   */
  queryState: string;
  /**
   * Whether ShareNotification/queryChanges can be used with this query.
   */
  canCalculateChanges: boolean;
  /**
   * 0-based index of the first id in the ids array.
   */
  position: number;
  /**
   * The matching ShareNotificationIds in the requested order.
   */
  ids: string[];
  /**
   * Total number of share notifications. Only present if calculateTotal was true.
   */
  total?: number;
  /**
   * The limit applied. Only present if a limit was applied.
   */
  limit?: number;
}
