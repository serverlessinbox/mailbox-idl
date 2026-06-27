/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface EmailQueryChangesArgs {
  /**
   * The account to check for query changes.
   */
  accountId: string;
  /**
   * Must match the filter used in the original Email/query call.
   */
  filter?: {
    [k: string]: unknown;
  };
  /**
   * Must match the sort used in the original Email/query call.
   */
  sort?: {
    [k: string]: unknown;
  }[];
  /**
   * The queryState from the previous Email/query or Email/queryChanges response.
   */
  sinceQueryState: string;
  /**
   * Maximum number of changes to return. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
  /**
   * Return changes only up to and including this EmailId.
   */
  upToId?: string;
}
