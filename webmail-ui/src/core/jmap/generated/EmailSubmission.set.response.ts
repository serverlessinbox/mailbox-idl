/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for EmailSubmission/set (RFC 8621 §7.5 / RFC 8620 §5.3).
 */
export interface EmailSubmissionSetResponse {
  /**
   * The account the set operation was performed on.
   */
  accountId: string;
  /**
   * The EmailSubmission state before this call, or null if no prior state existed.
   */
  oldState: string | null;
  /**
   * The EmailSubmission state after this call.
   */
  newState: string;
  /**
   * Map of creation id to the created EmailSubmission object.
   */
  created?: {
    [k: string]: EmailSubmission;
  } | null;
  /**
   * Map of id to the updated EmailSubmission object (or null if unchanged properties were not returned).
   */
  updated?: {
    [k: string]: EmailSubmission | null;
  } | null;
  /**
   * Ids of EmailSubmission objects that were successfully destroyed.
   */
  destroyed?: string[] | null;
  /**
   * Map of creation id to SetError for each failed create.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
  /**
   * Map of id to SetError for each failed update.
   */
  notUpdated?: {
    [k: string]: SetError;
  } | null;
  /**
   * Map of id to SetError for each failed destroy.
   */
  notDestroyed?: {
    [k: string]: SetError;
  } | null;
}
/**
 * A JMAP EmailSubmission object (RFC 8621 §7). Records the submission of an Email for delivery.
 */
export interface EmailSubmission {
  /**
   * The submission id.
   */
  id: string;
  /**
   * The identity used to send the email.
   */
  identityId: string;
  /**
   * The email being submitted.
   */
  emailId: string;
  /**
   * The thread the email belongs to (server-set).
   */
  threadId: string;
  /**
   * SMTP envelope. Null means the server generated it from the email headers.
   */
  envelope?: Envelope | null;
  /**
   * The date/time the email was/will be submitted (server-set).
   */
  sendAt: string;
  /**
   * Whether the submission can still be cancelled.
   */
  undoStatus: 'pending' | 'final' | 'canceled';
  /**
   * Map of recipient email → DeliveryStatus (server-set).
   */
  deliveryStatus?: {
    [k: string]: DeliveryStatus;
  } | null;
  /**
   * Blob ids of received DSN messages (server-set).
   */
  dsnBlobIds?: string[];
  /**
   * Blob ids of received MDN messages (server-set).
   */
  mdnBlobIds?: string[];
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
 * Per-recipient delivery status for an EmailSubmission (RFC 8621 §7).
 */
export interface DeliveryStatus {
  /**
   * The SMTP reply from the server, if received.
   */
  smtpReply?: string;
  /**
   * Whether the message has been delivered to the recipient's incoming mail server.
   */
  delivered: 'queued' | 'yes' | 'no' | 'unknown';
  /**
   * Whether the recipient's client has displayed it (from an MDN).
   */
  displayed: 'unknown' | 'yes';
}
/**
 * Describes why a create, update or destroy operation failed (RFC 8620 §5.3).
 */
export interface SetError {
  type: string;
  description?: string | null;
  properties?: string[] | null;
  [k: string]: unknown;
}
