/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface AddressBookChangesArgs {
  /**
   * The account to fetch address book changes for.
   */
  accountId: string;
  /**
   * The state string from the last AddressBook/get or AddressBook/changes response.
   */
  sinceState: string;
  /**
   * Maximum number of change records to return. If exceeded, hasMoreChanges will be true.
   */
  maxChanges?: number;
}
