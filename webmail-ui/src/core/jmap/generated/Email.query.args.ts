/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface EmailQueryArgs {
  /**
   * The account to query.
   */
  accountId: string;
  /**
   * Optional filter conditions to narrow results (e.g. inMailbox, from, subject).
   */
  filter?: {
    [k: string]: unknown;
  };
  /**
   * Sort criteria. Each object has a property name and isAscending flag. Defaults to date descending.
   */
  sort?: {
    [k: string]: unknown;
  }[];
  /**
   * Zero-based index of the first result to return. Cannot be combined with anchor.
   */
  position?: number;
  /**
   * EmailId to use as the anchor for pagination. The page starts at this email.
   */
  anchor?: string | null;
  /**
   * Offset in results relative to the anchor. Negative values move backwards.
   */
  anchorOffset?: number;
  /**
   * Maximum number of EmailIds to return. Defaults to server maximum.
   */
  limit?: number;
  /**
   * If true, compute the total number of matching emails (may be slower).
   */
  calculateTotal?: boolean;
  /**
   * If true, return only the latest email per thread, de-duplicating results.
   */
  collapseThreads?: boolean;
  /**
   * Opaque cursor returned by a previous Email/query response. Pass to retrieve the next page of results. Mutually exclusive with position and anchor. See https://specs.serverlessinbox.com/page-token
   */
  pageToken?: string | null;
  [k: string]: unknown;
}
