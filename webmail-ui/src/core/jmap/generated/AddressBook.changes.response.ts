/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface AddressBookChangesResponse {
  /**
   * The account these address book changes belong to.
   */
  accountId: string;
  /**
   * The state this response starts from.
   */
  oldState: string;
  /**
   * The current state after all listed changes; pass to the next call.
   */
  newState: string;
  /**
   * If true, additional changes exist beyond maxChanges. Call again with newState.
   */
  hasMoreChanges: boolean;
  /**
   * IDs of address books created since sinceState.
   */
  created: string[];
  /**
   * IDs of address books whose properties changed since sinceState.
   */
  updated: string[];
  /**
   * IDs of address books destroyed since sinceState.
   */
  destroyed: string[];
}
