/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

export interface PrincipalGetArgs {
  /**
   * The account to fetch principals from.
   */
  accountId: string;
  /**
   * IDs of specific principals to fetch. Null or omitted to fetch all principals.
   */
  ids?: readonly string[] | null;
  /**
   * Principal properties to include in the response. Null or omitted for all properties.
   */
  properties?: readonly string[] | null;
}
