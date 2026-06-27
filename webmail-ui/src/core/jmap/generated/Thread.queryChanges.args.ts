/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ThreadQueryChangesArgs {
  /**
   * The account to check for query changes.
   */
  accountId: string;
  /**
   * Must match the filter used in the original Thread/query call.
   */
  filter?: {
    [k: string]: unknown;
  } | null;
  /**
   * Must match the sort used in the original Thread/query call.
   */
  sort?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  /**
   * The queryState from the previous Thread/query or Thread/queryChanges response.
   */
  sinceQueryState: string;
  /**
   * Maximum number of changes to return. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
  /**
   * Return changes only up to and including this ThreadId.
   */
  upToId?: string;
  /**
   * If true, return the updated total count of results.
   */
  calculateTotal?: boolean;
}
