/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ContactCardChangesArgs {
  /**
   * The account to fetch contact card changes for.
   */
  accountId: string;
  /**
   * The state string from the last ContactCard/get or ContactCard/changes response.
   */
  sinceState: string;
  /**
   * Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
}
