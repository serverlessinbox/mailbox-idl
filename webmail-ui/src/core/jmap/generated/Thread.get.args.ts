/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ThreadGetArgs {
  /**
   * The account to fetch threads from.
   */
  accountId: string;
  /**
   * IDs of specific threads to fetch.
   */
  ids?: readonly string[];
  /**
   * Thread properties to include. Omit for all properties.
   */
  properties?: readonly string[];
}
