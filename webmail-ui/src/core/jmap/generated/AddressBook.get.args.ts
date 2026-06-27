/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface AddressBookGetArgs {
  /**
   * The account to fetch address books from.
   */
  accountId: string;
  /**
   * IDs of specific address books to fetch. Null or omitted to fetch all address books.
   */
  ids?: readonly string[] | null;
  /**
   * AddressBook properties to include in the response. Null or omitted for all properties.
   */
  properties?: readonly string[] | null;
}
