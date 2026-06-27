/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for Email/parse (RFC 8621 §5.5).
 */
export interface EmailParseResponse {
  /**
   * The account the blobs were parsed from.
   */
  accountId: string;
  /**
   * Map of blob id to parsed Email object.
   */
  parsed?: {
    /**
     * A parsed Email object (same shape as Email/get result).
     */
    [k: string]: {};
  } | null;
  /**
   * Blob ids that could not be parsed as RFC 5322 messages.
   */
  notParsable?: string[] | null;
  /**
   * Blob ids not found in the account.
   */
  notFound?: string[] | null;
}
