/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from Principal/set (RFC 9670 §3.3).
 */
export interface PrincipalSetResponse {
  /**
   * The account the changes were applied to.
   */
  accountId: string;
  /**
   * The Principal state before this set, or null if the server cannot calculate it.
   */
  oldState?: string | null;
  /**
   * The Principal state after this set.
   */
  newState: string;
  /**
   * Successfully created principals (typically empty — creation is server-managed).
   */
  created?: {
    [k: string]: Principal;
  } | null;
  /**
   * Map of successfully updated PrincipalId to the updated object (or null if unchanged properties are not returned).
   */
  updated?: {
    [k: string]: Principal | null;
  } | null;
  /**
   * PrincipalIds that were successfully destroyed (typically empty — destruction is server-managed).
   */
  destroyed?: string[] | null;
  /**
   * Creation ids that failed, with a SetError.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
  /**
   * PrincipalIds that failed to update, with a SetError.
   */
  notUpdated?: {
    [k: string]: SetError;
  } | null;
  /**
   * PrincipalIds that failed to destroy, with a SetError.
   */
  notDestroyed?: {
    [k: string]: SetError;
  } | null;
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
/**
 * Describes why a create, update or destroy operation failed (RFC 8620 §5.3).
 */
export interface SetError {
  type: string;
  description?: string | null;
  properties?: string[] | null;
  [k: string]: unknown;
}
