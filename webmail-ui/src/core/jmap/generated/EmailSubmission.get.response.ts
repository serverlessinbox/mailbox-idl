/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response for EmailSubmission/get (RFC 8621 §7.1 / RFC 8620 §5.1).
 */
export interface EmailSubmissionGetResponse {
  /**
   * The account the EmailSubmission objects belong to.
   */
  accountId: string;
  /**
   * Current EmailSubmission state, used in subsequent /changes calls.
   */
  state: string;
  /**
   * The requested EmailSubmission objects.
   */
  list: EmailSubmission[];
  /**
   * Ids that were not found.
   */
  notFound?: string[] | null;
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
