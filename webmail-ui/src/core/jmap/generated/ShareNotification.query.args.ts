/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for ShareNotification/query (RFC 9670 §4.4). Returns an ordered list of ShareNotification ids.
 */
export interface ShareNotificationQueryArgs {
  /**
   * The account to query share notifications from.
   */
  accountId: string;
  /**
   * Sort criteria. Each Comparator has a property (e.g. created) and optional isAscending (default true).
   */
  sort?:
    | {
        property: string;
        isAscending?: boolean;
        [k: string]: unknown;
      }[]
    | null;
  /**
   * 0-based index of the first result to return.
   */
  position?: number;
  /**
   * A ShareNotificationId to anchor the result page at.
   */
  anchor?: string;
  /**
   * Offset from the anchor (may be negative).
   */
  anchorOffset?: number;
  /**
   * Maximum number of ids to return.
   */
  limit?: number;
  /**
   * If true, return the total number of share notifications.
   */
  calculateTotal?: boolean;
}
