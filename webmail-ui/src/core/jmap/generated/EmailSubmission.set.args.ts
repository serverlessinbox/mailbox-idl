/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Arguments for EmailSubmission/set (RFC 8621 §7.5). Creates, updates, and destroys EmailSubmission objects.
 */
export interface EmailSubmissionSetArgs {
  /**
   * The account to create, update, or destroy EmailSubmission objects in.
   */
  accountId: string;
  /**
   * Optimistic concurrency guard on EmailSubmission state.
   */
  ifInState?: string | null;
  /**
   * Map of creation id to EmailSubmissionCreate objects.
   */
  create?: {
    [k: string]: EmailSubmissionCreate;
  } | null;
  /**
   * Map of submission id to patch objects (RFC 8620 §5.3 patch).
   */
  update?: {
    [k: string]: PatchObject;
  } | null;
  /**
   * Ids of EmailSubmission objects to destroy.
   */
  destroy?: readonly string[] | null;
  /**
   * Map of submission id (or creation id reference) to Email patch applied on successful send.
   */
  onSuccessUpdateEmail?: {
    [k: string]: PatchObject;
  } | null;
  /**
   * List of submission ids (or creation id references) whose associated Emails should be destroyed on successful send.
   */
  onSuccessDestroyEmail?: readonly string[] | null;
}
/**
 * Client-settable fields when creating an EmailSubmission (RFC 8621 §7.5).
 */
export interface EmailSubmissionCreate {
  /**
   * The identity to send from. Required.
   */
  identityId: string;
  /**
   * The email to submit. Required.
   */
  emailId: string;
  /**
   * SMTP envelope. If null the server generates it from the email headers.
   */
  envelope?: Envelope | null;
  /**
   * Scheduled send time. If null send immediately.
   */
  sendAt?: string | null;
}
/**
 * SMTP envelope for an email submission (RFC 8621 §7).
 */
export interface Envelope {
  mailFrom: AddressWithParameters;
  /**
   * SMTP RCPT TO addresses.
   */
  rcptTo: AddressWithParameters1[];
}
/**
 * SMTP MAIL FROM address.
 */
export interface AddressWithParameters {
  /**
   * The SMTP envelope address.
   */
  email: string;
  /**
   * Optional SMTP parameters (e.g. BODY, SIZE).
   */
  parameters?: {
    [k: string]: string | null;
  } | null;
}
/**
 * SMTP envelope address with optional SMTP parameters (RFC 8621 §7).
 */
export interface AddressWithParameters1 {
  /**
   * The SMTP envelope address.
   */
  email: string;
  /**
   * Optional SMTP parameters (e.g. BODY, SIZE).
   */
  parameters?: {
    [k: string]: string | null;
  } | null;
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
