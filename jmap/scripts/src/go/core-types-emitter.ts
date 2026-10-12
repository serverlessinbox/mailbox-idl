import type { JsonSchemaDefinitions } from '../schema/json-schema';
import type { GoStructEmitter } from './go-struct-emitter';
import type { GoTypeMapper } from './go-type-mapper';
import type { GoTemplates } from './templates';

/** The rendered core_types.go and the listed definitions that were absent from the core schema. */
export interface CoreTypesOutput {
  readonly source: string;
  readonly missingDefs: readonly string[];
}

/** Renders core_types.go from the `$defs` of the core types schema. */
export class CoreTypesEmitter {
  private readonly coreDefs: JsonSchemaDefinitions;
  private readonly mapper: GoTypeMapper;
  private readonly structEmitter: GoStructEmitter;
  private readonly templates: GoTemplates;

  private readonly complexDefNames: readonly string[] = [
    'EmailHeader',
    'Keywords',
    'Mailbox',
    'Email',
    'EmailBodyValue',
    'EmailBodyPart',
    'SetError',
    'EmailAddress',
    'AddressWithParameters',
    'Envelope',
    'DeliveryStatus',
    'EmailSubmission',
    'EmailSubmissionCreate',
    'Identity',
    'IdentityCreate',
    'IdentityUpdate',
    'MailboxCreate',
    'MailboxUpdate',
    'ImportEmailObject',
    'AddressBookRights',
    'AddressBook',
    'AddressBookCreate',
    'AddressBookUpdate',
    'NameComponent',
    'ContactCardName',
    'ContactCardEmail',
    'ContactCardPhone',
    'AddressComponent',
    'ContactCardAddress',
    'OrgUnit',
    'ContactCardOrganization',
    'ContactCardTitle',
    'ContactCardNote',
    'PartialDate',
    'ContactCardAnniversary',
    'ContactCardMedia',
    'ContactCard',
    'ContactCardCreate',
    'ContactCardUpdate',
    'Principal',
    'ShareNotificationBy',
    'ShareNotification',
  ];

  public constructor(
    coreDefs: JsonSchemaDefinitions,
    mapper: GoTypeMapper,
    structEmitter: GoStructEmitter,
    templates: GoTemplates,
  ) {
    this.coreDefs = coreDefs;
    this.mapper = mapper;
    this.structEmitter = structEmitter;
    this.templates = templates;
  }

  /** Renders the file; Thread is emitted ahead of Email whenever the core schema defines it. */
  public emit(): CoreTypesOutput {
    const defNames = this.orderedDefNames();
    const parts: string[] = [this.templates.schemaFileHeader(), '', this.templates.packageClause(), ''];

    if (defNames.some((defName) => this.hasAllOf(defName))) {
      parts.push(this.templates.jsonImport(), '');
    }

    const missingDefs: string[] = [];
    for (const defName of defNames) {
      if (!Object.prototype.hasOwnProperty.call(this.coreDefs, defName)) {
        missingDefs.push(defName);
        continue;
      }
      parts.push(...this.declarationOf(defName));
    }

    return { source: parts.join('\n'), missingDefs };
  }

  private declarationOf(defName: string): string[] {
    if (this.mapper.isSkippedDef(defName)) {
      return [];
    }
    if (defName === 'Keywords') {
      return [...this.templates.keywordsAlias(), ''];
    }

    const schema = this.coreDefs[defName];
    if (schema.allOf) {
      const allOfStruct = this.structEmitter.emitAllOfStruct(defName, schema);
      return allOfStruct === null ? [] : [allOfStruct, ''];
    }
    return [this.structEmitter.emitStruct(defName, schema, new Set(), this.mapper.globalScope), ''];
  }

  private orderedDefNames(): string[] {
    const defNames = [...this.complexDefNames];
    const hasThread = Object.prototype.hasOwnProperty.call(this.coreDefs, 'Thread');
    if (hasThread && !defNames.includes('Thread')) {
      defNames.splice(defNames.indexOf('Email'), 0, 'Thread');
    }
    return defNames;
  }

  private hasAllOf(defName: string): boolean {
    const schema = Object.prototype.hasOwnProperty.call(this.coreDefs, defName) ? this.coreDefs[defName] : undefined;
    return schema?.allOf !== undefined && !this.mapper.isSkippedDef(defName);
  }
}
