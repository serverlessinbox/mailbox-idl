/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for EmailSubmission/changes (RFC 8621 §7.4 / RFC 8620 §5.2).
 */
export interface EmailSubmissionChangesArgs {
  /**
   * The account to get EmailSubmission changes for.
   */
  accountId: string;
  /**
   * The state to get changes since.
   */
  sinceState: string;
  /**
   * Maximum number of changes to return.
   */
  maxChanges?: number | null;
}
