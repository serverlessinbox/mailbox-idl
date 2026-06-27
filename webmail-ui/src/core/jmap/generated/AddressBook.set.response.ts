/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from AddressBook/set (RFC 9610 §5.3).
 */
export interface AddressBookSetResponse {
  /**
   * The account the changes were applied to.
   */
  accountId: string;
  /**
   * The AddressBook state before this set, or null if the server cannot calculate it.
   */
  oldState?: string | null;
  /**
   * The AddressBook state after this set.
   */
  newState: string;
  /**
   * Successfully created address books, keyed by client creation id.
   */
  created?: {
    [k: string]: AddressBook;
  } | null;
  /**
   * Map of successfully updated AddressBookId to the updated object (or null if unchanged properties are not returned).
   */
  updated?: {
    [k: string]: AddressBook | null;
  } | null;
  /**
   * AddressBookIds that were successfully destroyed.
   */
  destroyed?: string[] | null;
  /**
   * Creation ids that failed, with a SetError.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
  /**
   * AddressBookIds that failed to update, with a SetError.
   */
  notUpdated?: {
    [k: string]: SetError;
  } | null;
  /**
   * AddressBookIds that failed to destroy, with a SetError.
   */
  notDestroyed?: {
    [k: string]: SetError;
  } | null;
}
/**
 * A JMAP AddressBook object (RFC 9610 §5). Groups ContactCard objects.
 */
export interface AddressBook {
  /**
   * The address book id (server-set, immutable).
   */
  id: string;
  /**
   * User-visible name of the address book.
   */
  name: string;
  /**
   * Optional human-readable description.
   */
  description?: string;
  /**
   * Client sort-order hint; lower values sort first.
   */
  sortOrder: number;
  /**
   * Whether this is the default address book for new contacts.
   */
  isDefault: boolean;
  /**
   * Whether the user is subscribed to this address book.
   */
  isSubscribed: boolean;
  /**
   * PrincipalId → AddressBookRights map of shared access (server-set for non-owners).
   */
  shareWith?: {
    [k: string]: AddressBookRights;
  };
  myRights: AddressBookRights1;
}
/**
 * Access rights a principal has on an address book (RFC 9610 §5.2).
 */
export interface AddressBookRights {
  /**
   * The principal may read the address book contents.
   */
  mayRead: boolean;
  /**
   * The principal may create, modify, and destroy contacts in this address book.
   */
  mayWrite: boolean;
  /**
   * The principal may modify the shareWith property of this address book.
   */
  mayShare: boolean;
  /**
   * The principal may delete this address book entirely.
   */
  mayDelete: boolean;
}
/**
 * Access rights a principal has on an address book (RFC 9610 §5.2).
 */
export interface AddressBookRights1 {
  /**
   * The principal may read the address book contents.
   */
  mayRead: boolean;
  /**
   * The principal may create, modify, and destroy contacts in this address book.
   */
  mayWrite: boolean;
  /**
   * The principal may modify the shareWith property of this address book.
   */
  mayShare: boolean;
  /**
   * The principal may delete this address book entirely.
   */
  mayDelete: boolean;
}
/**
 * Describes why a create, update or destroy operation failed (RFC 8620 §5.3).
 */
export interface SetError {
  type: string;
  description?: string | null;
  properties?: string[] | null;
  [k: string]: unknown;
}
