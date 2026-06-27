/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for Email/parse (RFC 8621 §5.5). Parses blobs as RFC 5322 messages without importing them.
 */
export interface EmailParseArgs {
  /**
   * The account whose blob store to parse from.
   */
  accountId: string;
  /**
   * Blob ids of the messages to parse.
   */
  blobIds: readonly string[];
  /**
   * Email properties to return. Defaults to all properties.
   */
  properties?: readonly string[] | null;
  /**
   * Body part properties to include.
   */
  bodyProperties?: readonly string[] | null;
  /**
   * If true, include values for text/plain body parts.
   */
  fetchTextBodyValues?: boolean | null;
  /**
   * If true, include values for text/html body parts.
   */
  fetchHTMLBodyValues?: boolean | null;
  /**
   * If true, include values for all body parts.
   */
  fetchAllBodyValues?: boolean | null;
  /**
   * Truncate body values to this byte length.
   */
  maxBodyValueBytes?: number | null;
}
