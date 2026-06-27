/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface PrincipalChangesArgs {
  /**
   * The account to fetch principal changes for.
   */
  accountId: string;
  /**
   * The state string from the last Principal/get or Principal/changes response.
   */
  sinceState: string;
  /**
   * Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
}
