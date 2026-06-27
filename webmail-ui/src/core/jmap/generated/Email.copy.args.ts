/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Email/copy (RFC 8621 §5.7 / RFC 8620 §5.4). Copies emails between accounts.
 */
export interface EmailCopyArgs {
  /**
   * The account to copy emails from.
   */
  fromAccountId: string;
  /**
   * Optimistic concurrency guard on the source Email state.
   */
  ifFromInState?: string | null;
  /**
   * The account to copy emails into.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard on the destination Email state.
   */
  ifInState?: string | null;
  /**
   * Map of client-assigned creation ids to objects describing the copy.
   */
  create: {
    [k: string]: {
      /**
       * The id of the Email in the source account.
       */
      id: string;
      /**
       * Map of Mailbox id to true in the destination account.
       */
      mailboxIds: {
        [k: string]: true;
      };
      /**
       * Keywords to set on the copied email.
       */
      keywords?: {
        [k: string]: true;
      };
    };
  };
  /**
   * If true, destroy original emails on success. Default: false.
   */
  onSuccessDestroyOriginal?: boolean | null;
  /**
   * Guard on source state when destroying originals.
   */
  destroyFromIfInState?: string | null;
}
