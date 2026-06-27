/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Identity/changes (RFC 8621 §6.2 / RFC 8620 §5.2).
 */
export interface IdentityChangesArgs {
  /**
   * The account to get Identity changes for.
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
