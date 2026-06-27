/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for EmailSubmission/queryChanges (RFC 8621 §7.3 / RFC 8620 §5.6).
 */
export interface EmailSubmissionQueryChangesArgs {
  /**
   * The account to get EmailSubmission query changes for.
   */
  accountId: string;
  /**
   * Must match the filter used in the original query.
   */
  filter?: {
    [k: string]: unknown;
  } | null;
  /**
   * Must match the sort used in the original query.
   */
  sort?:
    | {
        property: string;
        isAscending?: boolean;
      }[]
    | null;
  /**
   * The queryState to get changes since.
   */
  sinceQueryState: string;
  /**
   * Maximum number of changes to return.
   */
  maxChanges?: number | null;
  /**
   * Stop reporting changes after this id.
   */
  upToId?: string;
  /**
   * If true, return the new total count of query results.
   */
  calculateTotal?: boolean | null;
}
