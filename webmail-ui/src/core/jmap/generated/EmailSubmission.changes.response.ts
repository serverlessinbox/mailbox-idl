/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for EmailSubmission/changes (RFC 8621 §7.4 / RFC 8620 §5.2).
 */
export interface EmailSubmissionChangesResponse {
  /**
   * The account these changes are for.
   */
  accountId: string;
  /**
   * The sinceState value passed in the request.
   */
  oldState: string;
  /**
   * The current EmailSubmission state after these changes.
   */
  newState: string;
  /**
   * If true, more changes exist beyond maxChanges; make another call with newState as sinceState.
   */
  hasMoreChanges: boolean;
  /**
   * EmailSubmission ids created since sinceState.
   */
  created: string[];
  /**
   * EmailSubmission ids updated since sinceState.
   */
  updated: string[];
  /**
   * EmailSubmission ids destroyed since sinceState.
   */
  destroyed: string[];
}
