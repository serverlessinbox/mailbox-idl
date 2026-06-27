/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for ShareNotification/set (RFC 9670 §4.3). Destroy-only: create and update are not supported.
 */
export interface ShareNotificationSetArgs {
  /**
   * The account to apply changes to.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard. Fails with stateMismatch if the ShareNotification state differs.
   */
  ifInState?: string | null;
  /**
   * Always results in notCreated — share notifications are created by the server.
   */
  create?: {
    [k: string]: unknown;
  } | null;
  /**
   * Always results in notUpdated — share notifications are immutable.
   */
  update?: {
    [k: string]: unknown;
  } | null;
  /**
   * ShareNotificationIds to dismiss (destroy).
   */
  destroy?: readonly string[] | null;
}
