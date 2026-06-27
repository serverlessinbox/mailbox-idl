/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ShareNotificationGetArgs {
  /**
   * The account to fetch share notifications from.
   */
  accountId: string;
  /**
   * IDs of specific share notifications to fetch. Null or omitted to fetch all share notifications.
   */
  ids?: readonly string[] | null;
  /**
   * ShareNotification properties to include in the response. Null or omitted for all properties.
   */
  properties?: readonly string[] | null;
}
