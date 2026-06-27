/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for AddressBook/query (RFC 9610 §5.4). Returns an ordered list of AddressBook ids matching a filter.
 */
export interface AddressBookQueryArgs {
  /**
   * The account to query address books from.
   */
  accountId: string;
  /**
   * Filter conditions. Supported properties: isSubscribed (Boolean).
   */
  filter?: {
    [k: string]: unknown;
  } | null;
  /**
   * Sort criteria. Each Comparator has a property (e.g. name) and optional isAscending (default true).
   */
  sort?:
    | {
        property: string;
        isAscending?: boolean;
        [k: string]: unknown;
      }[]
    | null;
  /**
   * 0-based index of the first result to return.
   */
  position?: number;
  /**
   * An AddressBookId to anchor the result page at.
   */
  anchor?: string;
  /**
   * Offset from the anchor (may be negative).
   */
  anchorOffset?: number;
  /**
   * Maximum number of ids to return.
   */
  limit?: number;
  /**
   * If true, return the total number of matching address books.
   */
  calculateTotal?: boolean;
}
