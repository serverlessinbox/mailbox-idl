/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Principal/set (RFC 9670 §3.3). Only self-updates are allowed; create and destroy are not permitted for most principals.
 */
export interface PrincipalSetArgs {
  /**
   * The account to apply changes to.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard. Fails with stateMismatch if the Principal state differs.
   */
  ifInState?: string | null;
  /**
   * Always results in notCreated for server-managed principals.
   */
  create?: {
    [k: string]: unknown;
  } | null;
  /**
   * Map of PrincipalId to PatchObject. Only the calling user's own principal may be updated.
   */
  update?: {
    [k: string]: PatchObject;
  } | null;
  /**
   * Always results in notDestroyed for server-managed principals.
   */
  destroy?: readonly string[] | null;
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
