/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface PrincipalGetResponse {
  /**
   * The account the principals belong to.
   */
  accountId: string;
  /**
   * The current state of the Principal type. Pass to Principal/changes to detect future changes.
   */
  state: string;
  /**
   * The list of Principal objects that were found.
   */
  list: Principal[];
  /**
   * IDs from the request that could not be found.
   */
  notFound: string[];
}
/**
 * A JMAP Principal object representing a user, group, or resource (RFC 9670 §4).
 */
export interface Principal {
  /**
   * The principal id (server-set, immutable).
   */
  id: string;
  /**
   * Principal type (RFC 9670 §4).
   */
  type: 'individual' | 'group' | 'resource' | 'location' | 'other';
  /**
   * Human-readable display name for this principal.
   */
  name: string;
  /**
   * Optional free-text description.
   */
  description?: string;
  /**
   * Primary email address for this principal, if any. Must conform to addr-spec syntax (RFC 5322 §3.4.1) (RFC 9670 §2).
   */
  email?: string | null;
  /**
   * IANA time zone identifier for this principal.
   */
  timeZone?: string;
  /**
   * BlobId of a profile picture, or null if none.
   */
  picture?: string | null;
}
