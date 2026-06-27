/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ShareNotificationChangesArgs {
  /**
   * The account to fetch share notification changes for.
   */
  accountId: string;
  /**
   * The state string from the last ShareNotification/get or ShareNotification/changes response.
   */
  sinceState: string;
  /**
   * Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
}
