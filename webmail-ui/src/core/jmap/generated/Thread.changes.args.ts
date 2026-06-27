/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Thread/changes (RFC 8621 §2.2 / RFC 8620 §5.2). Returns thread ids changed since a given state.
 */
export interface ThreadChangesArgs {
  /**
   * The account to get Thread changes for.
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
