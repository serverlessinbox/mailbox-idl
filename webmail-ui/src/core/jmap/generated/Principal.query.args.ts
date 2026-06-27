/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Principal/query (RFC 9670 §3.4). Returns an ordered list of Principal ids matching a filter.
 */
export interface PrincipalQueryArgs {
  /**
   * The account to query principals from.
   */
  accountId: string;
  /**
   * Filter conditions. Supported properties: type (String), name (String), email (String), timeZone (String), description (String), hidden (Boolean).
   */
  filter?: {
    [k: string]: unknown;
  } | null;
  /**
   * Sort criteria. Each Comparator has a property (e.g. name, type) and optional isAscending (default true).
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
   * A PrincipalId to anchor the result page at.
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
   * If true, return the total number of matching principals.
   */
  calculateTotal?: boolean;
}
