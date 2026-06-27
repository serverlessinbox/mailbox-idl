/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Thread/query (RFC 8621 §2.3 / RFC 8620 §5.5). Returns a sorted, filtered list of Thread ids.
 */
export interface ThreadQueryArgs {
  /**
   * The account to query threads in.
   */
  accountId: string;
  /**
   * Conditions to filter threads. See RFC 8621 for filter conditions.
   */
  filter?: {
    [k: string]: unknown;
  } | null;
  /**
   * List of Comparator objects specifying sort order.
   */
  sort?:
    | {
        property: string;
        isAscending?: boolean;
        collation?: string;
      }[]
    | null;
  /**
   * Zero-based index of first result to return.
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
   * If true, return total count of results.
   */
  calculateTotal?: boolean | null;
  /**
   * Opaque cursor returned by a previous Thread/query response. Pass to retrieve the next page of results. Mutually exclusive with position and anchor. See https://specs.serverlessinbox.com/page-token
   */
  pageToken?: string | null;
  [k: string]: unknown;
}
