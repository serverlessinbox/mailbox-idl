/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for Thread/changes (RFC 8621 §2.2 / RFC 8620 §5.2).
 */
export interface ThreadChangesResponse {
  /**
   * The account these changes are for.
   */
  accountId: string;
  /**
   * The sinceState value passed in the request.
   */
  oldState: string;
  /**
   * The current Thread state after these changes.
   */
  newState: string;
  /**
   * If true, more changes exist beyond maxChanges; make another call with newState as sinceState.
   */
  hasMoreChanges: boolean;
  /**
   * Thread ids created since sinceState.
   */
  created: string[];
  /**
   * Thread ids updated since sinceState.
   */
  updated: string[];
  /**
   * Thread ids destroyed since sinceState.
   */
  destroyed: string[];
}
