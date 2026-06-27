/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for Identity/changes (RFC 8621 §6.2 / RFC 8620 §5.2).
 */
export interface IdentityChangesResponse {
  /**
   * The account these changes are for.
   */
  accountId: string;
  /**
   * The sinceState value passed in the request.
   */
  oldState: string;
  /**
   * The current Identity state after these changes.
   */
  newState: string;
  /**
   * If true, more changes exist beyond maxChanges; make another call with newState as sinceState.
   */
  hasMoreChanges: boolean;
  /**
   * Identity ids created since sinceState.
   */
  created: string[];
  /**
   * Identity ids updated since sinceState.
   */
  updated: string[];
  /**
   * Identity ids destroyed since sinceState.
   */
  destroyed: string[];
}
