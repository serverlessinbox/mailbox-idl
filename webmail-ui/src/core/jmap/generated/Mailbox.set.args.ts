/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Mailbox/set (RFC 8621 §3.5). Creates, updates, or destroys Mailbox objects.
 */
export interface MailboxSetArgs {
  /**
   * The account to apply changes to.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard. The call fails with stateMismatch if the Mailbox state differs.
   */
  ifInState?: string | null;
  /**
   * Map of client-assigned creation ids to Mailbox objects to create.
   */
  create?: {
    [k: string]: MailboxCreate;
  } | null;
  /**
   * Map of MailboxId to PatchObject. Only explicitly listed properties are changed.
   */
  update?: {
    [k: string]: PatchObject;
  } | null;
  /**
   * MailboxIds to delete.
   */
  destroy?: readonly string[] | null;
  /**
   * If true, also destroy all emails in the mailbox. Default false; destroying a non-empty mailbox without this flag results in a mailboxHasChild or mailboxHasEmail error.
   */
  onDestroyRemoveEmails?: boolean;
}
/**
 * Client-settable fields when creating a Mailbox (RFC 8621 §3.5).
 */
export interface MailboxCreate {
  /**
   * User-visible name.
   */
  name: string;
  /**
   * Parent mailbox id, or null for top-level.
   */
  parentId?: string | null;
  /**
   * System role (inbox, trash, etc.), or null.
   */
  role?: string | null;
  /**
   * Sort order hint for display.
   */
  sortOrder?: number;
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
