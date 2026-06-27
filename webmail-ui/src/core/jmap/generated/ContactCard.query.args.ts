/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for ContactCard/query (RFC 9610 §6.4). Returns an ordered list of ContactCard ids matching a filter.
 */
export interface ContactCardQueryArgs {
  /**
   * The account to query contact cards from.
   */
  accountId: string;
  /**
   * Filter conditions. Supported properties: inAddressBook (AddressBookId), uid (String), hasMember (String), kind (String), createdBefore/createdAfter (UTCDate), updatedBefore/updatedAfter (UTCDate), text/name/nickname/organization/email/phone/onlineService/address/note (String).
   */
  filter?: {
    [k: string]: unknown;
  } | null;
  /**
   * Sort criteria. Each Comparator has a property (e.g. nickname, created, updated) and optional isAscending (default true).
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
   * A ContactCardId to anchor the result page at.
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
   * If true, return the total number of matching contact cards.
   */
  calculateTotal?: boolean;
}
