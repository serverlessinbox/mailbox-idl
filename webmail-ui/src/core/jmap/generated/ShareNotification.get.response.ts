/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ShareNotificationGetResponse {
  /**
   * The account the share notifications belong to.
   */
  accountId: string;
  /**
   * The current state of the ShareNotification type. Pass to ShareNotification/changes to detect future changes.
   */
  state: string;
  /**
   * The list of ShareNotification objects that were found.
   */
  list: ShareNotification[];
  /**
   * IDs from the request that could not be found.
   */
  notFound: string[];
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
