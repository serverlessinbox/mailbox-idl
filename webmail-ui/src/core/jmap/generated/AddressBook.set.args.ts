/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for AddressBook/set (RFC 9610 §5.3). Creates, updates, or destroys AddressBook objects.
 */
export interface AddressBookSetArgs {
  /**
   * The account to apply changes to.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard. Fails with stateMismatch if the AddressBook state differs.
   */
  ifInState?: string | null;
  /**
   * Map of client-assigned creation ids to AddressBookCreate objects.
   */
  create?: {
    [k: string]: AddressBookCreate;
  } | null;
  /**
   * Map of AddressBookId to PatchObject. Only explicitly listed properties are changed.
   */
  update?: {
    [k: string]: PatchObject;
  } | null;
  /**
   * AddressBookIds to delete.
   */
  destroy?: readonly string[] | null;
  /**
   * If true, also destroy all ContactCards in the address book. Default false.
   */
  onDestroyRemoveContents?: boolean;
}
/**
 * Fields for creating a new AddressBook.
 */
export interface AddressBookCreate {
  /**
   * User-visible name of the address book.
   */
  name: string;
  /**
   * Optional human-readable description.
   */
  description?: string;
  /**
   * Client sort-order hint.
   */
  sortOrder?: number;
  /**
   * Whether this should be the default address book for new contacts.
   */
  isDefault?: boolean;
  /**
   * Initial PrincipalId → AddressBookRights sharing map.
   */
  shareWith?: {
    [k: string]: AddressBookRights;
  };
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
 * JMAP PatchObject (RFC 8620 §5.3): keys are JSON Pointers (e.g. /name); values are replacement values or null to remove.
 */
export interface PatchObject {
  /**
   * This interface was referenced by `PatchObject`'s JSON-Schema definition
   * via the `patternProperty` "^/".
   */
  [k: string]: unknown;
}
