/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface PrincipalChangesResponse {
  /**
   * The account these principal changes belong to.
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
   * IDs of principals created since sinceState.
   */
  created: string[];
  /**
   * IDs of principals whose properties changed since sinceState.
   */
  updated: string[];
  /**
   * IDs of principals destroyed since sinceState.
   */
  destroyed: string[];
}
