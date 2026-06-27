/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface AddressBookGetResponse {
  /**
   * The account the address books belong to.
   */
  accountId: string;
  /**
   * The current state of the AddressBook type. Pass to AddressBook/changes to detect future changes.
   */
  state: string;
  /**
   * The list of AddressBook objects that were found.
   */
  list: AddressBook[];
  /**
   * IDs from the request that could not be found.
   */
  notFound: string[];
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
