/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for EmailSubmission/get (RFC 8621 §7.1 / RFC 8620 §5.1). Fetches EmailSubmission objects.
 */
export interface EmailSubmissionGetArgs {
  /**
   * The account to fetch EmailSubmission objects from.
   */
  accountId: string;
  /**
   * Submission ids to fetch. If null, returns all.
   */
  ids?: readonly string[] | null;
  /**
   * EmailSubmission properties to return. Defaults to all properties.
   */
  properties?: readonly string[] | null;
}
