/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from AddressBook/query (RFC 9610 §5.4).
 */
export interface AddressBookQueryResponse {
  /**
   * The account the query ran against.
   */
  accountId: string;
  /**
   * Opaque state string. Pass to AddressBook/queryChanges to detect future changes.
   */
  queryState: string;
  /**
   * Whether AddressBook/queryChanges can be used with this query.
   */
  canCalculateChanges: boolean;
  /**
   * 0-based index of the first id in the ids array.
   */
  position: number;
  /**
   * The matching AddressBookIds in the requested order.
   */
  ids: string[];
  /**
   * Total number of matching address books. Only present if calculateTotal was true.
   */
  total?: number;
  /**
   * The limit applied. Only present if a limit was applied.
   */
  limit?: number;
}
