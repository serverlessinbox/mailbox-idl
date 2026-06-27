/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */

/**
 * Response from ContactCard/set (RFC 9610 §6.3).
 */
export interface ContactCardSetResponse {
  /**
   * The account the changes were applied to.
   */
  accountId: string;
  /**
   * The ContactCard state before this set, or null if the server cannot calculate it.
   */
  oldState?: string | null;
  /**
   * The ContactCard state after this set.
   */
  newState: string;
  /**
   * Successfully created contact cards, keyed by client creation id.
   */
  created?: {
    [k: string]: ContactCard;
  } | null;
  /**
   * Map of successfully updated ContactCardId to the updated object (or null if unchanged properties are not returned).
   */
  updated?: {
    [k: string]: ContactCard | null;
  } | null;
  /**
   * ContactCardIds that were successfully destroyed.
   */
  destroyed?: string[] | null;
  /**
   * Creation ids that failed, with a SetError.
   */
  notCreated?: {
    [k: string]: SetError;
  } | null;
  /**
   * ContactCardIds that failed to update, with a SetError.
   */
  notUpdated?: {
    [k: string]: SetError;
  } | null;
  /**
   * ContactCardIds that failed to destroy, with a SetError.
   */
  notDestroyed?: {
    [k: string]: SetError;
  } | null;
}
/**
 * A JMAP ContactCard object (RFC 9610 / JSContact RFC 9553).
 */
export interface ContactCard {
  /**
   * Must be "Card" (RFC 9553 §2.2)
   */
  '@type': 'Card';
  /**
   * Must be "1.0" (RFC 9553 §2.3)
   */
  version: '1.0';
  /**
   * The contact card id (server-set, immutable).
   */
  id: string;
  /**
   * AddressBookId → true map indicating which address books contain this card (server-set).
   */
  addressBookIds?: {
    [k: string]: boolean;
  };
  /**
   * UTC date-time the card was first created (server-set, RFC 9553 §2.1.3).
   */
  created?: string;
  /**
   * UTC date-time of the last modification (server-set, RFC 9553 §2.1.10).
   */
  updated?: string;
  name?: ContactCardName;
  /**
   * String-keyed map of email address entries.
   */
  emails?: {
    [k: string]: ContactCardEmail;
  };
  /**
   * String-keyed map of phone number entries.
   */
  phones?: {
    [k: string]: ContactCardPhone;
  };
  /**
   * String-keyed map of postal address entries.
   */
  addresses?: {
    [k: string]: ContactCardAddress;
  };
  /**
   * String-keyed map of organization entries.
   */
  organizations?: {
    [k: string]: ContactCardOrganization;
  };
  /**
   * String-keyed map of title/role entries.
   */
  titles?: {
    [k: string]: ContactCardTitle;
  };
  /**
   * String-keyed map of free-text note entries.
   */
  notes?: {
    [k: string]: ContactCardNote;
  };
  /**
   * String-keyed map of anniversary entries.
   */
  anniversaries?: {
    [k: string]: ContactCardAnniversary;
  };
  /**
   * String-keyed map of media entries (photos, logos, sounds).
   */
  media?: {
    [k: string]: ContactCardMedia;
  };
}
/**
 * Structured name (RFC 9553 §2.2.1).
 */
export interface ContactCardName {
  /**
   * Ordered name components.
   */
  components?: NameComponent[];
  /**
   * Full name as a single string.
   */
  full?: string;
  /**
   * Whether the components are in display order.
   */
  isOrdered?: boolean;
}
/**
 * A single component of a JSContact name (RFC 9553 §2.2.1.2).
 */
export interface NameComponent {
  /**
   * Component kind: title, given, given2, surname, surname2, credential, generation, separator.
   */
  kind: string;
  /**
   * The text value of this component.
   */
  value: string;
}
/**
 * A single email address entry on a ContactCard (RFC 9553 §2.3.1).
 */
export interface ContactCardEmail {
  /**
   * The email address.
   */
  address: string;
  /**
   * Optional UI label.
   */
  label?: string;
  /**
   * Usage contexts (e.g. work, private).
   */
  contexts?: {
    [k: string]: boolean;
  };
  /**
   * Preference value; lower is more preferred.
   */
  pref?: number;
}
/**
 * A single phone number entry on a ContactCard (RFC 9553 §2.3.3).
 */
export interface ContactCardPhone {
  /**
   * The phone number string.
   */
  number: string;
  /**
   * Optional UI label.
   */
  label?: string;
  /**
   * Usage contexts (e.g. work, private).
   */
  contexts?: {
    [k: string]: boolean;
  };
  /**
   * Phone features (e.g. voice, fax, cell, video).
   */
  features?: {
    [k: string]: boolean;
  };
  /**
   * Preference value; lower is more preferred.
   */
  pref?: number;
}
/**
 * A structured postal address entry on a ContactCard (RFC 9553 §2.5.1).
 */
export interface ContactCardAddress {
  /**
   * Ordered address components.
   */
  components?: AddressComponent[];
  /**
   * Full address as a single string.
   */
  full?: string;
  /**
   * ISO 3166-1 alpha-2 country code.
   */
  countryCode?: string;
  /**
   * Whether the components are in display order.
   */
  isOrdered?: boolean;
  /**
   * Usage contexts.
   */
  contexts?: {
    [k: string]: boolean;
  };
  /**
   * Preference value; lower is more preferred.
   */
  pref?: number;
}
/**
 * A single component of a structured postal address (RFC 9553 §2.5.1.2).
 */
export interface AddressComponent {
  /**
   * Component kind: room, apartment, floor, building, number, name, block, subdistrict, district, locality, region, postcode, country, direction, landmark, postOfficeBox, separator.
   */
  kind: string;
  /**
   * The text value of this component.
   */
  value: string;
}
/**
 * An organization entry on a ContactCard (RFC 9553 §2.2.3).
 */
export interface ContactCardOrganization {
  /**
   * Name of the organization.
   */
  name?: string;
  /**
   * Organizational units.
   */
  units?: OrgUnit[];
  /**
   * Usage contexts.
   */
  contexts?: {
    [k: string]: boolean;
  };
}
/**
 * An organizational unit within an organization entry (RFC 9553 §2.2.3).
 */
export interface OrgUnit {
  /**
   * Name of the organizational unit.
   */
  name: string;
}
/**
 * A job title or role entry on a ContactCard (RFC 9553 §2.2.5). Kind: title (default) or role.
 */
export interface ContactCardTitle {
  /**
   * Title or role text.
   */
  name: string;
  /**
   * "title" or "role".
   */
  kind?: string;
}
/**
 * A free-text note on a ContactCard (RFC 9553 §2.8.3).
 */
export interface ContactCardNote {
  /**
   * Note text.
   */
  note: string;
}
/**
 * A named date such as a birthday on a ContactCard (RFC 9553 §2.8.1). Kind: birth, death, wedding.
 */
export interface ContactCardAnniversary {
  /**
   * Anniversary kind: birth, death, wedding.
   */
  kind: string;
  date: PartialDate;
}
/**
 * The date (partial dates supported).
 */
export interface PartialDate {
  /**
   * 4-digit year. Omit if unknown.
   */
  year?: number;
  /**
   * Month (1-12). Omit if unknown.
   */
  month?: number;
  /**
   * Day of month (1-31). Omit if unknown.
   */
  day?: number;
}
/**
 * A media entry (photo, sound, logo) on a ContactCard (RFC 9553 §2.6.4, RFC 9610 blobId extension).
 */
export interface ContactCardMedia {
  /**
   * Media kind: photo, sound, logo.
   */
  kind: string;
  /**
   * URI to an external resource. Mutually exclusive with blobId.
   */
  uri?: string;
  /**
   * BlobId of a hosted media blob. On input: an UploadBlobID; on output: a permanent ContactBlobID (cnt: prefix).
   */
  blobId?: string;
  /**
   * MIME type (e.g. image/jpeg).
   */
  mediaType?: string;
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
