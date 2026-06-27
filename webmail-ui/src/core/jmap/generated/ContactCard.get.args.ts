/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ContactCardGetArgs {
  /**
   * The account to fetch contact cards from.
   */
  accountId: string;
  /**
   * IDs of specific contact cards to fetch. Null or omitted to fetch all contact cards.
   */
  ids?: readonly string[] | null;
  /**
   * ContactCard properties to include in the response. Null or omitted for all properties.
   */
  properties?: readonly string[] | null;
}
