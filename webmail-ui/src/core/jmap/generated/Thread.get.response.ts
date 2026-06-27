/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface ThreadGetResponse {
  /**
   * The account the threads belong to.
   */
  accountId: string;
  /**
   * The current state of the Thread type.
   */
  state: string;
  /**
   * The list of Thread objects that were found.
   */
  list: ({
    /**
     * Identifies a Thread object (RFC 8621 §2).
     */
    id: string;
    emailIds: string[];
  } & {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^sib:".
     */
    [k: string]: unknown;
  })[];
  /**
   * IDs from the request that could not be found.
   */
  notFound?: string[];
}
