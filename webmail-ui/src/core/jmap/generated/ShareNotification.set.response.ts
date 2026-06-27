/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from ShareNotification/set (RFC 9670 §4.3).
 */
export interface ShareNotificationSetResponse {
  /**
   * The account the changes were applied to.
   */
  accountId: string;
  /**
   * The ShareNotification state before this set, or null if the server cannot calculate it.
   */
  oldState?: string | null;
  /**
   * The ShareNotification state after this set.
   */
  newState: string;
  /**
   * Typically empty — share notifications are created by the server.
   */
  created?: {
    [k: string]: ShareNotification;
  } | null;
  /**
   * Typically empty — share notifications are immutable.
   */
  updated?: {
    [k: string]: ShareNotification | null;
  } | null;
  /**
   * ShareNotificationIds that were successfully dismissed.
   */
  destroyed?: string[] | null;
  /**
   * Creation ids that failed, with a SetError.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
  /**
   * ShareNotificationIds that failed to update, with a SetError.
   */
  notUpdated?: {
    [k: string]: SetError;
  } | null;
  /**
   * ShareNotificationIds that failed to destroy, with a SetError.
   */
  notDestroyed?: {
    [k: string]: SetError;
  } | null;
}
/**
 * A JMAP ShareNotification object recording a sharing change (RFC 9670 §5).
 */
export interface ShareNotification {
  /**
   * The notification id (server-set, immutable).
   */
  id: string;
  /**
   * UTC date-time the notification was created (server-set).
   */
  created: string;
  changedBy: ShareNotificationBy;
  /**
   * The data type that was shared (e.g. "AddressBook").
   */
  objectType: string;
  /**
   * The account that owns the shared object.
   */
  objectAccountId: string;
  /**
   * The id of the shared object.
   */
  objectId: string;
  /**
   * Rights before the change. Null if the principal was newly added.
   */
  oldRights?: {
    [k: string]: boolean;
  } | null;
  /**
   * Rights after the change. Null if the principal was removed.
   */
  newRights?: {
    [k: string]: boolean;
  } | null;
}
/**
 * Who made the sharing change.
 */
export interface ShareNotificationBy {
  /**
   * Type of actor, e.g. "principal" or "system".
   */
  type: string;
  /**
   * Display name of the actor.
   */
  name: string;
  /**
   * Id of the actor principal, if applicable.
   */
  principalId?: string | null;
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
