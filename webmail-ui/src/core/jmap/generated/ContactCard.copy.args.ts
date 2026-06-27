/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for ContactCard/copy (RFC 9610 §6.6). Copies contact cards between accounts.
 */
export interface ContactCardCopyArgs {
  /**
   * The account to copy contact cards from.
   */
  fromAccountId: string;
  /**
   * Optimistic concurrency guard on the source ContactCard state.
   */
  ifFromInState?: string | null;
  /**
   * The account to copy contact cards into.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard on the destination ContactCard state.
   */
  ifInState?: string | null;
  /**
   * Map of client-assigned creation ids to objects describing the copy.
   */
  create: {
    [k: string]: {
      /**
       * The id of the ContactCard in the source account.
       */
      id: string;
      /**
       * The AddressBook to place the copy in.
       */
      addressBookId: string;
    };
  };
  /**
   * If true, destroy original contact cards on success. Default: false.
   */
  onSuccessDestroyOriginal?: boolean | null;
  /**
   * Guard on source state when destroying originals.
   */
  destroyFromIfInState?: string | null;
}
