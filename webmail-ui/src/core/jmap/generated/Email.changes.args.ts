/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface EmailChangesArgs {
  /**
   * The account to fetch changes for.
   */
  accountId: string;
  /**
   * The state string from the last Email/get or Email/changes response. Only changes after this state are returned.
   */
  sinceState: string;
  /**
   * Maximum number of change records to return. Omit for no limit. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
}
