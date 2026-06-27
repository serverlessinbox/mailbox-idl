/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ShareNotificationChangesResponse {
  /**
   * The account these share notification changes belong to.
   */
  accountId: string;
  /**
   * The state this response starts from.
   */
  oldState: string;
  /**
   * The current state after all listed changes; pass to the next call.
   */
  newState: string;
  /**
   * If true, additional changes exist beyond maxChanges. Call again with newState.
   */
  hasMoreChanges: boolean;
  /**
   * IDs of share notifications created since sinceState.
   */
  created: string[];
  /**
   * IDs of share notifications whose properties changed since sinceState.
   */
  updated: string[];
  /**
   * IDs of share notifications destroyed since sinceState.
   */
  destroyed: string[];
}
