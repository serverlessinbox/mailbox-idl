/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface MailboxGetArgs {
  /**
   * The account to fetch mailboxes from.
   */
  accountId: string;
  /**
   * IDs of specific mailboxes to fetch. Omit to fetch all mailboxes for the account.
   */
  ids?: readonly string[];
  /**
   * Mailbox properties to include in the response. Omit for all properties.
   */
  properties?: readonly string[];
}
