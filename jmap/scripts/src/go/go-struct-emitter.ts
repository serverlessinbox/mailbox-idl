import type { JsonSchemaNode } from '../schema/json-schema';
import type { GoNaming } from './go-naming';
import type { GoStructField, GoStructFormatter } from './go-struct-formatter';
import type { GoTypeMapper, GoTypeScope } from './go-type-mapper';
import type { GoTemplates } from './templates';

/** Renders Go struct declarations from JSON Schema objects. */
export class GoStructEmitter {
  private readonly mapper: GoTypeMapper;
  private readonly naming: GoNaming;
  private readonly formatter: GoStructFormatter;
  private readonly templates: GoTemplates;

  public constructor(mapper: GoTypeMapper, naming: GoNaming, formatter: GoStructFormatter, templates: GoTemplates) {
    this.mapper = mapper;
    this.naming = naming;
    this.formatter = formatter;
    this.templates = templates;
  }

  /**
   * Renders the struct for an object schema. Properties named in `refFields`
   * accept either a literal id list or a result reference, and are typed so.
   */
  public emitStruct(typeName: string, schema: JsonSchemaNode, refFields: ReadonlySet<string>, scope: GoTypeScope): string {
    const required = new Set(schema.required ?? []);
    const fields = Object.entries(schema.properties ?? {}).map(([key, property]) =>
      this.field(key, property, required.has(key), refFields.has(key), scope),
    );

    const docComment = this.templates.typeDocComment(typeName, schema.description ?? schema.title ?? '');
    return [
      ...(docComment === undefined ? [] : [docComment]),
      this.templates.structOpen(typeName),
      ...this.formatter.format(fields),
      this.templates.structClose(),
    ].join('\n');
  }

  /**
   * Renders a struct that embeds the first `allOf` entry and adds vendor-prefixed
   * properties, or null when the schema has no embeddable base definition.
   */
  public emitAllOfStruct(typeName: string, schema: JsonSchemaNode): string | null {
    const baseRef = schema.allOf?.[0]?.$ref;
    if (!baseRef) {
      return null;
    }
    const baseDefName = this.mapper.definitionName(baseRef);
    if (!baseDefName || this.mapper.isStringOnlyDef(baseDefName) || this.mapper.isSkippedDef(baseDefName)) {
      return null;
    }
    return this.templates.allOfStruct(typeName, baseDefName).join('\n');
  }

  private field(key: string, property: JsonSchemaNode, required: boolean, acceptsRef: boolean, scope: GoTypeScope): GoStructField {
    return {
      name: this.naming.fieldName(key),
      type: acceptsRef ? this.templates.refFieldType : this.mapper.map(property, required, scope),
      tag: this.templates.jsonTag(key, required),
      comment: acceptsRef ? this.templates.refFieldComment : this.templates.fieldComment(property.description ?? ''),
    };
  }
}
