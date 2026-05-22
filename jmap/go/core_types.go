// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.

package jmapsdk

import "encoding/json"

// EmailHeader A single raw message header field (RFC 8621 §4.1.3). Ordering is preserved.
type EmailHeader struct {
	Name string `json:"name"` // Header field name (case-insensitive per RFC 5322).
	Value string `json:"value"` // Header field value (decoded, with folding whitespace collapsed).
}

// Keywords is a map of IMAP keyword → true. The presence of a key means the keyword is set (RFC 8621 §4.1.1).
type Keywords = map[string]bool

// Mailbox A JMAP Mailbox object (RFC 8621 §3). Represents a folder or label used to organise emails.
type Mailbox struct {
	ID string `json:"id"` // The mailbox id (server-set, immutable).
	AccountID *string `json:"accountId,omitempty"` // The account this mailbox belongs to (server-set).
	Name *string `json:"name,omitempty"` // User-visible name of the mailbox.
	Role *string `json:"role,omitempty"` // System role (inbox, trash, drafts, etc.), or null for user-created mailboxes.
	ParentID *string `json:"parentId,omitempty"` // Id of the parent mailbox, or null if top-level.
	SortOrder *int64 `json:"sortOrder,omitempty"` // Client sort-order hint; lower values sort first.
	Deletable *bool `json:"deletable,omitempty"` // Whether the user may delete this mailbox (server-set).
	TotalEmails *int64 `json:"totalEmails,omitempty"` // Total number of emails in the mailbox (server-set).
	UnreadEmails *int64 `json:"unreadEmails,omitempty"` // Number of emails without the \Seen keyword (server-set).
	TotalThreads *int64 `json:"totalThreads,omitempty"` // Total number of threads with at least one email in this mailbox, or null if not supported (server-set).
	UnreadThreads *int64 `json:"unreadThreads,omitempty"` // Number of threads with at least one unread email in this mailbox, or null if not supported (server-set).
}

// MailboxBase Base Mailbox shape used as the allOf anchor for MailboxExt (allows vendor-prefixed properties).
type MailboxBase struct {
	ID string `json:"id"` // The mailbox id (server-set, immutable).
	AccountID *string `json:"accountId,omitempty"` // The account this mailbox belongs to (server-set).
	Name *string `json:"name,omitempty"` // User-visible name of the mailbox.
	Role *string `json:"role,omitempty"` // System role (inbox, trash, drafts, etc.), or null for user-created mailboxes.
	ParentID *string `json:"parentId,omitempty"` // Id of the parent mailbox, or null if top-level.
	SortOrder *int64 `json:"sortOrder,omitempty"` // Client sort-order hint; lower values sort first.
	Deletable *bool `json:"deletable,omitempty"` // Whether the user may delete this mailbox (server-set).
	TotalEmails *int64 `json:"totalEmails,omitempty"` // Total number of emails in the mailbox (server-set).
	UnreadEmails *int64 `json:"unreadEmails,omitempty"` // Number of emails without the \Seen keyword (server-set).
	TotalThreads *int64 `json:"totalThreads,omitempty"` // Total number of threads with at least one email in this mailbox, or null if not supported (server-set).
	UnreadThreads *int64 `json:"unreadThreads,omitempty"` // Number of threads with at least one unread email in this mailbox, or null if not supported (server-set).
}

// MailboxExt extends MailboxBase with vendor-prefixed properties.
type MailboxExt struct {
	MailboxBase
	// captures sib: vendor-prefixed properties
	ExtraProperties map[string]json.RawMessage `json:"-"`
}

// Thread A JMAP Thread object (RFC 8621 §2). Groups related Email objects.
type Thread struct {
	ID string `json:"id"` // The thread id.
	EmailIDs []string `json:"emailIds"` // Ordered list of email ids in this thread, oldest first.
}

// Email A JMAP Email object (RFC 8621 §4). Represents a single RFC 5322 message.
type Email struct {
	ID string `json:"id"` // The email id (server-set, immutable).
	BlobID *string `json:"blobId,omitempty"` // Blob id of the raw RFC 5322 message (server-set).
	ThreadID *string `json:"threadId,omitempty"` // Thread this email belongs to (server-set).
	MailboxIDs map[string]bool `json:"mailboxIds,omitempty"` // Id[Boolean] map — MailboxId → true means the email is in that mailbox (RFC 8621 §4.1.1).
	Keywords Keywords `json:"keywords,omitempty"` // IMAP keywords set on this email.
	Size *int64 `json:"size,omitempty"` // Size in bytes of the raw RFC 5322 message (server-set).
	ReceivedAt *string `json:"receivedAt,omitempty"` // Date/time the message was received by the server.
	SentAt *string `json:"sentAt,omitempty"` // Date/time from the Date header (RFC 8621 §4.1.3).
	Subject *string `json:"subject,omitempty"` // Decoded Subject header value, or null if absent.
	MessageID []string `json:"messageId,omitempty"` // Array of Message-ID values (RFC 8621 §4.1.3), or null if absent.
	InReplyTo []string `json:"inReplyTo,omitempty"` // Array of In-Reply-To values (RFC 8621 §4.1.3), or null if absent.
	References []string `json:"references,omitempty"` // Array of References values (RFC 8621 §4.1.3), or null if absent.
	Sender []EmailAddress `json:"sender,omitempty"` // Sender header addresses (RFC 8621 §4.1.2.3), or null if absent.
	From []EmailAddress `json:"from,omitempty"` // From header addresses (RFC 8621 §4.1.2.3), or null if absent.
	To []EmailAddress `json:"to,omitempty"` // To header addresses (RFC 8621 §4.1.2.3), or null if absent.
	Cc []EmailAddress `json:"cc,omitempty"` // Cc header addresses (RFC 8621 §4.1.2.3), or null if absent.
	Bcc []EmailAddress `json:"bcc,omitempty"` // Bcc header addresses (RFC 8621 §4.1.2.3), or null if absent.
	ReplyTo []EmailAddress `json:"replyTo,omitempty"` // Reply-To header addresses (RFC 8621 §4.1.2.3), or null if absent.
	Preview *string `json:"preview,omitempty"` // Plain-text excerpt of the message body (at most 256 characters, server-set).
	HasAttachment *bool `json:"hasAttachment,omitempty"` // True if the message has at least one attachment (server-set).
	Headers []EmailHeader `json:"headers,omitempty"` // Ordered list of all raw message header fields (RFC 8621 §4.1.3).
}

// EmailBase Base Email shape used as the allOf anchor for EmailExt (allows vendor-prefixed properties).
type EmailBase struct {
	ID string `json:"id"` // The email id (server-set, immutable).
	BlobID *string `json:"blobId,omitempty"` // Blob id of the raw RFC 5322 message (server-set).
	ThreadID *string `json:"threadId,omitempty"` // Thread this email belongs to (server-set).
	MailboxIDs map[string]bool `json:"mailboxIds,omitempty"` // Id[Boolean] map — MailboxId → true means the email is in that mailbox (RFC 8621 §4.1.1).
	Keywords Keywords `json:"keywords,omitempty"` // IMAP keywords set on this email.
	Size *int64 `json:"size,omitempty"` // Size in bytes of the raw RFC 5322 message (server-set).
	ReceivedAt *string `json:"receivedAt,omitempty"` // Date/time the message was received by the server.
	SentAt *string `json:"sentAt,omitempty"` // Date/time from the Date header (RFC 8621 §4.1.3).
	Subject *string `json:"subject,omitempty"` // Decoded Subject header value, or null if absent.
	MessageID []string `json:"messageId,omitempty"` // Array of Message-ID values (RFC 8621 §4.1.3), or null if absent.
	InReplyTo []string `json:"inReplyTo,omitempty"` // Array of In-Reply-To values (RFC 8621 §4.1.3), or null if absent.
	References []string `json:"references,omitempty"` // Array of References values (RFC 8621 §4.1.3), or null if absent.
	Sender []EmailAddress `json:"sender,omitempty"` // Sender header addresses (RFC 8621 §4.1.2.3), or null if absent.
	From []EmailAddress `json:"from,omitempty"` // From header addresses (RFC 8621 §4.1.2.3), or null if absent.
	To []EmailAddress `json:"to,omitempty"` // To header addresses (RFC 8621 §4.1.2.3), or null if absent.
	Cc []EmailAddress `json:"cc,omitempty"` // Cc header addresses (RFC 8621 §4.1.2.3), or null if absent.
	Bcc []EmailAddress `json:"bcc,omitempty"` // Bcc header addresses (RFC 8621 §4.1.2.3), or null if absent.
	ReplyTo []EmailAddress `json:"replyTo,omitempty"` // Reply-To header addresses (RFC 8621 §4.1.2.3), or null if absent.
	Preview *string `json:"preview,omitempty"` // Plain-text excerpt of the message body (at most 256 characters, server-set).
	HasAttachment *bool `json:"hasAttachment,omitempty"` // True if the message has at least one attachment (server-set).
	Headers []EmailHeader `json:"headers,omitempty"` // Ordered list of all raw message header fields (RFC 8621 §4.1.3).
}

// EmailExt extends EmailBase with vendor-prefixed properties.
type EmailExt struct {
	EmailBase
	// captures sib: vendor-prefixed properties
	ExtraProperties map[string]json.RawMessage `json:"-"`
}

// SetError Describes why a create, update or destroy operation failed (RFC 8620 §5.3).
type SetError struct {
	Type string `json:"type"`
	Description *string `json:"description,omitempty"`
	Properties []string `json:"properties,omitempty"`
}

// EmailAddress An email address with an optional display name (RFC 8621 §4.1.2).
type EmailAddress struct {
	Name *string `json:"name,omitempty"` // Display name, or null if none.
	Email string `json:"email"` // The email address (addr-spec).
}

// AddressWithParameters SMTP envelope address with optional SMTP parameters (RFC 8621 §7).
type AddressWithParameters struct {
	Email string `json:"email"` // The SMTP envelope address.
	Parameters map[string]*string `json:"parameters,omitempty"` // Optional SMTP parameters (e.g. BODY, SIZE).
}

// Envelope SMTP envelope for an email submission (RFC 8621 §7).
type Envelope struct {
	MailFrom AddressWithParameters `json:"mailFrom"` // SMTP MAIL FROM address.
	RcptTo []AddressWithParameters `json:"rcptTo"` // SMTP RCPT TO addresses.
}

// DeliveryStatus Per-recipient delivery status for an EmailSubmission (RFC 8621 §7).
type DeliveryStatus struct {
	SmtpReply *string `json:"smtpReply,omitempty"` // The SMTP reply from the server, if received.
	Delivered string `json:"delivered"` // Whether the message has been delivered to the recipient's incoming mail server.
	Displayed string `json:"displayed"` // Whether the recipient's client has displayed it (from an MDN).
}

// EmailSubmission A JMAP EmailSubmission object (RFC 8621 §7). Records the submission of an Email for delivery.
type EmailSubmission struct {
	ID string `json:"id"` // The submission id.
	IdentityID string `json:"identityId"` // The identity used to send the email.
	EmailID string `json:"emailId"` // The email being submitted.
	ThreadID string `json:"threadId"` // The thread the email belongs to (server-set).
	Envelope *Envelope `json:"envelope,omitempty"` // SMTP envelope. Null means the server generated it from the email headers.
	SendAt string `json:"sendAt"` // The date/time the email was/will be submitted (server-set).
	UndoStatus string `json:"undoStatus"` // Whether the submission can still be cancelled.
	DeliveryStatus map[string]DeliveryStatus `json:"deliveryStatus,omitempty"` // Map of recipient email → DeliveryStatus (server-set).
	DSNBlobIDs []string `json:"dsnBlobIds,omitempty"` // Blob ids of received DSN messages (server-set).
	MDNBlobIDs []string `json:"mdnBlobIds,omitempty"` // Blob ids of received MDN messages (server-set).
}

// EmailSubmissionCreate Client-settable fields when creating an EmailSubmission (RFC 8621 §7.5).
type EmailSubmissionCreate struct {
	IdentityID string `json:"identityId"` // The identity to send from. Required.
	EmailID string `json:"emailId"` // The email to submit. Required.
	Envelope *Envelope `json:"envelope,omitempty"` // SMTP envelope. If null the server generates it from the email headers.
	SendAt *string `json:"sendAt,omitempty"` // Scheduled send time. If null send immediately.
}

// Identity A JMAP Identity object (RFC 8621 §6). Represents a From address the user may send from.
type Identity struct {
	ID string `json:"id"` // The identity id (server-set).
	Name string `json:"name"` // Display name shown in the From header.
	Email string `json:"email"` // The email address. Server-set and immutable.
	ReplyTo []EmailAddress `json:"replyTo,omitempty"` // Reply-To header addresses, or null for none.
	Bcc []EmailAddress `json:"bcc,omitempty"` // Bcc header addresses added to all outgoing emails, or null for none.
	TextSignature string `json:"textSignature"` // Plain-text signature appended to outgoing emails.
	HtmlSignature string `json:"htmlSignature"` // HTML signature appended to outgoing emails.
	MayDelete bool `json:"mayDelete"` // Whether the user may delete this identity (server-set).
}

// IdentityUpdate Client-settable fields when updating an Identity (RFC 8621 §6.2). Users cannot change email, id, or mayDelete.
type IdentityUpdate struct {
	Name *string `json:"name,omitempty"` // Display name shown in the From header.
	ReplyTo []EmailAddress `json:"replyTo,omitempty"` // Reply-To header addresses, or null to remove.
	Bcc []EmailAddress `json:"bcc,omitempty"` // Bcc addresses added to all outgoing emails, or null to remove.
	TextSignature *string `json:"textSignature,omitempty"` // Plain-text signature appended to outgoing emails.
	HtmlSignature *string `json:"htmlSignature,omitempty"` // HTML signature appended to outgoing emails.
}

// MailboxCreate Client-settable fields when creating a Mailbox (RFC 8621 §3.5).
type MailboxCreate struct {
	Name string `json:"name"` // User-visible name.
	ParentID *string `json:"parentId,omitempty"` // Parent mailbox id, or null for top-level.
	Role *string `json:"role,omitempty"` // System role (inbox, trash, etc.), or null.
	SortOrder *int64 `json:"sortOrder,omitempty"` // Sort order hint for display.
}

// MailboxUpdate Client-settable fields when updating a Mailbox (RFC 8621 §3.5). Delivered as a PatchObject in practice.
type MailboxUpdate struct {
	Name *string `json:"name,omitempty"` // New user-visible name for the mailbox.
	ParentID *string `json:"parentId,omitempty"` // New parent mailbox id, or null to move to top-level.
	SortOrder *int64 `json:"sortOrder,omitempty"` // New client sort-order hint.
}

// ImportEmailObject A single email to import via Email/import (RFC 8621 §5.4).
type ImportEmailObject struct {
	BlobID string `json:"blobId"` // Blob id of the raw RFC 5322 message to import.
	MailboxIDs map[string]bool `json:"mailboxIds"` // Id[Boolean] map — MailboxId → true. At least one entry required (RFC 8621 §4.8).
	Keywords Keywords `json:"keywords,omitempty"` // Initial keywords to set on the email.
	ReceivedAt *string `json:"receivedAt,omitempty"` // Override for the receivedAt date. If null the server uses the current time.
}

// AddressBookRights Access rights a principal has on an address book (RFC 9610 §5.2).
type AddressBookRights struct {
	MayRead bool `json:"mayRead"` // The principal may read the address book contents.
	MayWrite bool `json:"mayWrite"` // The principal may create, modify, and destroy contacts in this address book.
	MayShare bool `json:"mayShare"` // The principal may modify the shareWith property of this address book.
	MayDelete bool `json:"mayDelete"` // The principal may delete this address book entirely.
}

// AddressBook A JMAP AddressBook object (RFC 9610 §5). Groups ContactCard objects.
type AddressBook struct {
	ID string `json:"id"` // The address book id (server-set, immutable).
	Name string `json:"name"` // User-visible name of the address book.
	Description *string `json:"description,omitempty"` // Optional human-readable description.
	SortOrder int64 `json:"sortOrder"` // Client sort-order hint; lower values sort first.
	IsDefault bool `json:"isDefault"` // Whether this is the default address book for new contacts.
	IsSubscribed bool `json:"isSubscribed"` // Whether the user is subscribed to this address book.
	ShareWith map[string]AddressBookRights `json:"shareWith,omitempty"` // PrincipalId → AddressBookRights map of shared access (server-set for non-owners).
	MyRights AddressBookRights `json:"myRights"` // The rights the current user has on this address book (server-set).
}

// AddressBookCreate Fields for creating a new AddressBook.
type AddressBookCreate struct {
	Name string `json:"name"` // User-visible name of the address book.
	Description *string `json:"description,omitempty"` // Optional human-readable description.
	SortOrder *int64 `json:"sortOrder,omitempty"` // Client sort-order hint.
	IsDefault *bool `json:"isDefault,omitempty"` // Whether this should be the default address book for new contacts.
	ShareWith map[string]AddressBookRights `json:"shareWith,omitempty"` // Initial PrincipalId → AddressBookRights sharing map.
}

// AddressBookUpdate Fields that may be patched on an AddressBook. All properties are optional.
type AddressBookUpdate struct {
	Name *string `json:"name,omitempty"` // New name for the address book.
	Description *string `json:"description,omitempty"` // New description.
	SortOrder *int64 `json:"sortOrder,omitempty"` // New sort-order hint.
	IsDefault *bool `json:"isDefault,omitempty"` // Set to true to make this the default address book.
	IsSubscribed *bool `json:"isSubscribed,omitempty"` // Set subscription status.
	ShareWith map[string]AddressBookRights `json:"shareWith,omitempty"` // Replacement PrincipalId → AddressBookRights sharing map.
}

// NameComponent A single component of a JSContact name (RFC 9553 §2.2.1.2).
type NameComponent struct {
	Kind string `json:"kind"` // Component kind: title, given, given2, surname, surname2, credential, generation, separator.
	Value string `json:"value"` // The text value of this component.
}

// ContactCardName Structured name for a ContactCard (RFC 9553 §2.2.1).
type ContactCardName struct {
	Components []NameComponent `json:"components,omitempty"` // Ordered name components.
	Full *string `json:"full,omitempty"` // Full name as a single string.
	IsOrdered *bool `json:"isOrdered,omitempty"` // Whether the components are in display order.
}

// ContactCardEmail A single email address entry on a ContactCard (RFC 9553 §2.3.1).
type ContactCardEmail struct {
	Address string `json:"address"` // The email address.
	Label *string `json:"label,omitempty"` // Optional UI label.
	Contexts map[string]bool `json:"contexts,omitempty"` // Usage contexts (e.g. work, private).
	Pref *int64 `json:"pref,omitempty"` // Preference value; lower is more preferred.
}

// ContactCardPhone A single phone number entry on a ContactCard (RFC 9553 §2.3.3).
type ContactCardPhone struct {
	Number string `json:"number"` // The phone number string.
	Label *string `json:"label,omitempty"` // Optional UI label.
	Contexts map[string]bool `json:"contexts,omitempty"` // Usage contexts (e.g. work, private).
	Features map[string]bool `json:"features,omitempty"` // Phone features (e.g. voice, fax, cell, video).
	Pref *int64 `json:"pref,omitempty"` // Preference value; lower is more preferred.
}

// AddressComponent A single component of a structured postal address (RFC 9553 §2.5.1.2).
type AddressComponent struct {
	Kind string `json:"kind"` // Component kind: room, apartment, floor, building, number, name, block, subdistrict, district, locality, region, postcode, country, direction, landmark, postOfficeBox, separator.
	Value string `json:"value"` // The text value of this component.
}

// ContactCardAddress A structured postal address entry on a ContactCard (RFC 9553 §2.5.1).
type ContactCardAddress struct {
	Components []AddressComponent `json:"components,omitempty"` // Ordered address components.
	Full *string `json:"full,omitempty"` // Full address as a single string.
	CountryCode *string `json:"countryCode,omitempty"` // ISO 3166-1 alpha-2 country code.
	IsOrdered *bool `json:"isOrdered,omitempty"` // Whether the components are in display order.
	Contexts map[string]bool `json:"contexts,omitempty"` // Usage contexts.
	Pref *int64 `json:"pref,omitempty"` // Preference value; lower is more preferred.
}

// OrgUnit An organizational unit within an organization entry (RFC 9553 §2.2.3).
type OrgUnit struct {
	Name string `json:"name"` // Name of the organizational unit.
}

// ContactCardOrganization An organization entry on a ContactCard (RFC 9553 §2.2.3).
type ContactCardOrganization struct {
	Name *string `json:"name,omitempty"` // Name of the organization.
	Units []OrgUnit `json:"units,omitempty"` // Organizational units.
	Contexts map[string]bool `json:"contexts,omitempty"` // Usage contexts.
}

// ContactCardTitle A job title or role entry on a ContactCard (RFC 9553 §2.2.5). Kind: title (default) or role.
type ContactCardTitle struct {
	Name string `json:"name"` // Title or role text.
	Kind *string `json:"kind,omitempty"` // "title" or "role".
}

// ContactCardNote A free-text note on a ContactCard (RFC 9553 §2.8.3).
type ContactCardNote struct {
	Note string `json:"note"` // Note text.
}

// PartialDate A complete or partial calendar date (RFC 9553 §2.8.1).
type PartialDate struct {
	Year *int64 `json:"year,omitempty"` // 4-digit year. Omit if unknown.
	Month *int64 `json:"month,omitempty"` // Month (1-12). Omit if unknown.
	Day *int64 `json:"day,omitempty"` // Day of month (1-31). Omit if unknown.
}

// ContactCardAnniversary A named date such as a birthday on a ContactCard (RFC 9553 §2.8.1). Kind: birth, death, wedding.
type ContactCardAnniversary struct {
	Kind string `json:"kind"` // Anniversary kind: birth, death, wedding.
	Date PartialDate `json:"date"` // The date (partial dates supported).
}

// ContactCardMedia A media entry (photo, sound, logo) on a ContactCard (RFC 9553 §2.6.4, RFC 9610 blobId extension).
type ContactCardMedia struct {
	Kind string `json:"kind"` // Media kind: photo, sound, logo.
	Uri *string `json:"uri,omitempty"` // URI to an external resource. Mutually exclusive with blobId.
	BlobID *string `json:"blobId,omitempty"` // BlobId of a hosted media blob. On input: an UploadBlobID; on output: a permanent ContactBlobID (cnt: prefix).
	MediaType *string `json:"mediaType,omitempty"` // MIME type (e.g. image/jpeg).
}

// ContactCard A JMAP ContactCard object (RFC 9610 / JSContact RFC 9553).
type ContactCard struct {
	ID string `json:"id"` // The contact card id (server-set, immutable).
	AddressBookIDs map[string]bool `json:"addressBookIds,omitempty"` // AddressBookId → true map indicating which address books contain this card (server-set).
	Created *string `json:"created,omitempty"` // UTC date-time the card was first created (server-set, RFC 9553 §2.1.3).
	Updated *string `json:"updated,omitempty"` // UTC date-time of the last modification (server-set, RFC 9553 §2.1.10).
	Name ContactCardName `json:"name,omitempty"` // Structured name (RFC 9553 §2.2.1).
	Emails map[string]ContactCardEmail `json:"emails,omitempty"` // String-keyed map of email address entries.
	Phones map[string]ContactCardPhone `json:"phones,omitempty"` // String-keyed map of phone number entries.
	Addresses map[string]ContactCardAddress `json:"addresses,omitempty"` // String-keyed map of postal address entries.
	Organizations map[string]ContactCardOrganization `json:"organizations,omitempty"` // String-keyed map of organization entries.
	Titles map[string]ContactCardTitle `json:"titles,omitempty"` // String-keyed map of title/role entries.
	Notes map[string]ContactCardNote `json:"notes,omitempty"` // String-keyed map of free-text note entries.
	Anniversaries map[string]ContactCardAnniversary `json:"anniversaries,omitempty"` // String-keyed map of anniversary entries.
	Media map[string]ContactCardMedia `json:"media,omitempty"` // String-keyed map of media entries (photos, logos, sounds).
}

// ContactCardCreate Fields for creating a new ContactCard. addressBookIds is required.
type ContactCardCreate struct {
	AddressBookIDs map[string]bool `json:"addressBookIds"` // AddressBookId → true map. Exactly one entry required.
	Name ContactCardName `json:"name,omitempty"`
	Emails map[string]ContactCardEmail `json:"emails,omitempty"`
	Phones map[string]ContactCardPhone `json:"phones,omitempty"`
	Addresses map[string]ContactCardAddress `json:"addresses,omitempty"`
	Organizations map[string]ContactCardOrganization `json:"organizations,omitempty"`
	Titles map[string]ContactCardTitle `json:"titles,omitempty"`
	Notes map[string]ContactCardNote `json:"notes,omitempty"`
	Anniversaries map[string]ContactCardAnniversary `json:"anniversaries,omitempty"`
	Media map[string]ContactCardMedia `json:"media,omitempty"`
}

// ContactCardUpdate Fields that may be patched on a ContactCard. All properties are optional.
type ContactCardUpdate struct {
	AddressBookIDs map[string]bool `json:"addressBookIds,omitempty"` // Replacement AddressBookId → true map.
	Name ContactCardName `json:"name,omitempty"`
	Emails map[string]ContactCardEmail `json:"emails,omitempty"`
	Phones map[string]ContactCardPhone `json:"phones,omitempty"`
	Addresses map[string]ContactCardAddress `json:"addresses,omitempty"`
	Organizations map[string]ContactCardOrganization `json:"organizations,omitempty"`
	Titles map[string]ContactCardTitle `json:"titles,omitempty"`
	Notes map[string]ContactCardNote `json:"notes,omitempty"`
	Anniversaries map[string]ContactCardAnniversary `json:"anniversaries,omitempty"`
	Media map[string]ContactCardMedia `json:"media,omitempty"`
}

// Principal A JMAP Principal object representing a user, group, or resource (RFC 9670 §4).
type Principal struct {
	ID string `json:"id"` // The principal id (server-set, immutable).
	Type string `json:"type"` // Principal type (RFC 9670 §4).
	Name string `json:"name"` // Human-readable display name for this principal.
	Description *string `json:"description,omitempty"` // Optional free-text description.
	Email *EmailAddress `json:"email,omitempty"` // Primary email address for this principal, if any.
	TimeZone *string `json:"timeZone,omitempty"` // IANA time zone identifier for this principal.
	Picture *string `json:"picture,omitempty"` // BlobId of a profile picture, or null if none.
}

// ShareNotificationBy Describes who made a sharing change (RFC 9670 §5).
type ShareNotificationBy struct {
	Type string `json:"type"` // Type of actor, e.g. "principal" or "system".
	Name string `json:"name"` // Display name of the actor.
	PrincipalID *string `json:"principalId,omitempty"` // Id of the actor principal, if applicable.
}

// ShareNotification A JMAP ShareNotification object recording a sharing change (RFC 9670 §5).
type ShareNotification struct {
	ID string `json:"id"` // The notification id (server-set, immutable).
	Created string `json:"created"` // UTC date-time the notification was created (server-set).
	ChangedBy ShareNotificationBy `json:"changedBy"` // Who made the sharing change.
	ObjectType string `json:"objectType"` // The data type that was shared (e.g. "AddressBook").
	ObjectAccountID string `json:"objectAccountId"` // The account that owns the shared object.
	ObjectID string `json:"objectId"` // The id of the shared object.
	OldRights map[string]bool `json:"oldRights,omitempty"` // Rights before the change. Null if the principal was newly added.
	NewRights map[string]bool `json:"newRights,omitempty"` // Rights after the change. Null if the principal was removed.
}
