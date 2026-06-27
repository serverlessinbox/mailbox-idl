/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ContactCardChangesResponse {
  /**
   * The account these contact card changes belong to.
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
   * IDs of contact cards created since sinceState.
   */
  created: string[];
  /**
   * IDs of contact cards whose properties changed since sinceState.
   */
  updated: string[];
  /**
   * IDs of contact cards destroyed since sinceState.
   */
  destroyed: string[];
}
