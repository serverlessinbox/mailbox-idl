import type { JsonSchemaDefinitions, JsonSchemaNode } from '../schema/json-schema';

/** The definitions a `$ref` may resolve against besides the core types, and the prefix of their Go type names. */
export interface GoTypeScope {
  readonly localDefs: JsonSchemaDefinitions | undefined;
  readonly localDefsPrefix: string;
}

/**
 * Maps JSON Schema nodes to Go type expressions. Definitions that are plain
 * strings in Go, and PatchObject (hand-written in shared.go), never get a
 * generated type of their own.
 */
export class GoTypeMapper {
  /** A scope with no local definitions, used for core types and local helper structs. */
  public readonly globalScope: GoTypeScope = { localDefs: undefined, localDefsPrefix: '' };

  private readonly coreDefs: JsonSchemaDefinitions;

  private readonly stringOnlyDefs: ReadonlySet<string> = new Set([
    'Id',
    'AccountId',
    'EmailId',
    'MailboxId',
    'ThreadId',
    'JmapDate',
    'SubmissionId',
    'IdentityId',
    'BlobId',
    'CreationId',
    'AddressBookId',
    'ContactCardId',
    'PrincipalId',
    'ShareNotificationId',
  ]);

  private readonly skippedDefs: ReadonlySet<string> = new Set(['PatchObject']);

  public constructor(coreDefs: JsonSchemaDefinitions) {
    this.coreDefs = coreDefs;
  }

  /** Whether a definition is written as a plain `string` instead of a named type. */
  public isStringOnlyDef(defName: string): boolean {
    return this.stringOnlyDefs.has(defName);
  }

  /** Whether a definition is hand-written and therefore never generated. */
  public isSkippedDef(defName: string): boolean {
    return this.skippedDefs.has(defName);
  }

  /** The definition name of a `$ref`, or null when it does not point at a `$defs` entry. */
  public definitionName(ref: string): string | null {
    const marker = '#/$defs/';
    const index = ref.indexOf(marker);
    return index === -1 ? null : ref.slice(index + marker.length);
  }

  /** The Go type of a schema; a non-required scalar becomes a pointer. */
  public map(schema: JsonSchemaNode, required: boolean, scope: GoTypeScope): string {
    if (schema.$ref) {
      return this.mapRef(schema.$ref, required, scope);
    }
    if (schema.anyOf) {
      return this.mapAnyOf(schema.anyOf, required, scope);
    }

    const type = schema.type;
    if (typeof type === 'object') {
      return this.mapTypeList(type, schema, scope);
    }

    switch (type) {
      case 'string':
        return required ? 'string' : '*string';
      case 'integer':
        return required ? 'int64' : '*int64';
      case 'number':
        return required ? 'float64' : '*float64';
      case 'boolean':
        return required ? 'bool' : '*bool';
      case 'array':
        return '[]' + this.map(schema.items ?? {}, true, scope);
      case 'object':
        return typeof schema.additionalProperties === 'object'
          ? 'map[string]' + this.map(schema.additionalProperties, true, scope)
          : 'map[string]any';
      default:
        return 'any';
    }
  }

  private mapRef(ref: string, required: boolean, scope: GoTypeScope): string {
    const defName = this.definitionName(ref);
    if (!defName) {
      return 'any';
    }

    const localDefs = scope.localDefs;
    if (localDefs && this.hasDef(localDefs, defName) && !this.isCanonicalDef(defName)) {
      if (localDefs[defName].type === 'string') {
        return required ? 'string' : '*string';
      }
      return scope.localDefsPrefix + defName;
    }

    if (this.stringOnlyDefs.has(defName)) {
      return required ? 'string' : '*string';
    }
    return defName;
  }

  private mapAnyOf(anyOf: readonly JsonSchemaNode[], required: boolean, scope: GoTypeScope): string {
    const nonNull = anyOf.filter((s) => s.type !== 'null' && !(s.$ref === undefined && Object.keys(s).length === 0));
    const hasNull = anyOf.some((s) => s.type === 'null');

    if (nonNull.length !== 1) {
      return 'any';
    }
    const inner = this.map(nonNull[0], true, scope);
    return hasNull || !required ? this.pointerUnlessIndirect(inner) : inner;
  }

  private mapTypeList(types: readonly string[], schema: JsonSchemaNode, scope: GoTypeScope): string {
    if (!types.includes('null') || types.length !== 2) {
      return 'any';
    }
    const inner = this.map(
      {
        type: types.find((x) => x !== 'null'),
        items: schema.items,
        additionalProperties: schema.additionalProperties,
        properties: schema.properties,
      },
      true,
      scope,
    );
    return this.pointerUnlessIndirect(inner);
  }

  private isCanonicalDef(defName: string): boolean {
    return this.hasDef(this.coreDefs, defName) || this.stringOnlyDefs.has(defName) || this.skippedDefs.has(defName);
  }

  private hasDef(defs: JsonSchemaDefinitions, defName: string): boolean {
    return Object.prototype.hasOwnProperty.call(defs, defName);
  }

  private pointerUnlessIndirect(goType: string): string {
    const isIndirect = goType.startsWith('*') || goType.startsWith('map[') || goType.startsWith('[]');
    return isIndirect ? goType : '*' + goType;
  }
}
