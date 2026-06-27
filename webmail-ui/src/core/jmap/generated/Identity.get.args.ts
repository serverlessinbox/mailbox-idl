/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Identity/get (RFC 8621 §6.1 / RFC 8620 §5.1). Fetches Identity objects.
 */
export interface IdentityGetArgs {
  /**
   * The account to fetch Identity objects from.
   */
  accountId: string;
  /**
   * Identity ids to fetch. If null, returns all identities.
   */
  ids?: readonly string[] | null;
  /**
   * Identity properties to return. Defaults to all properties.
   */
  properties?: readonly string[] | null;
}
