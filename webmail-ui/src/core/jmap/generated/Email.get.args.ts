/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface EmailGetArgs {
  /**
   * The account to fetch emails from.
   */
  accountId: string;
  /**
   * IDs of the emails to fetch. Omit or pass null to fetch all (subject to limit).
   */
  ids?: readonly string[];
  /**
   * Email properties to include in the response. Omit for all properties.
   */
  properties?: readonly string[];
  /**
   * Properties to include for each body part object. Defaults to a standard set.
   */
  bodyProperties?: readonly string[];
  /**
   * If true, fetch the value of text/plain body parts.
   */
  fetchTextBodyValues?: boolean;
  /**
   * If true, fetch the value of text/html body parts.
   */
  fetchHTMLBodyValues?: boolean;
  /**
   * If true, fetch all body part values regardless of content type.
   */
  fetchAllBodyValues?: boolean;
  /**
   * Truncate body values to this many bytes. 0 means no truncation.
   */
  maxBodyValueBytes?: number;
  /**
   * List of specific header field names to return as header: values.
   */
  fetchHeaders?: readonly string[];
  /**
   * If true, return all raw headers regardless of fetchHeaders list.
   */
  fetchAllHeaders?: boolean | null;
}
