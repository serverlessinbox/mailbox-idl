/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface EmailChangesResponse {
  /**
   * The account these changes belong to.
   */
  accountId: string;
  /**
   * The state this response starts from (matches sinceState from the request).
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
   * IDs of emails created since sinceState.
   */
  created: string[];
  /**
   * IDs of emails whose properties changed since sinceState.
   */
  updated: string[];
  /**
   * IDs of emails destroyed since sinceState.
   */
  destroyed: string[];
}
