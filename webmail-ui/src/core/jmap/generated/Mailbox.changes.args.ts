/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface MailboxChangesArgs {
  /**
   * The account to fetch mailbox changes for.
   */
  accountId: string;
  /**
   * The state string from the last Mailbox/get or Mailbox/changes response.
   */
  sinceState: string;
  /**
   * Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
}
