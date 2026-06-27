/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for EmailSubmission/query (RFC 8621 §7.2 / RFC 8620 §5.5).
 */
export interface EmailSubmissionQueryArgs {
  /**
   * The account to query EmailSubmission objects in.
   */
  accountId: string;
  /**
   * Conditions to filter EmailSubmission objects.
   */
  filter?: {
    [k: string]: unknown;
  } | null;
  /**
   * List of Comparator objects specifying the sort order.
   */
  sort?:
    | {
        property: string;
        isAscending?: boolean;
      }[]
    | null;
  /**
   * Zero-based index of the first result to return.
   */
  position?: number | null;
  /**
   * Id of an item to anchor the result window on.
   */
  anchor?: string;
  /**
   * Offset relative to the anchor.
   */
  anchorOffset?: number | null;
  /**
   * Maximum number of ids to return.
   */
  limit?: number | null;
  /**
   * If true, return the total count of results.
   */
  calculateTotal?: boolean | null;
}
