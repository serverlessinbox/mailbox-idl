/**
 * The JSON Schema keywords the generators read. Any other keyword in a schema
 * document is left untouched and ignored.
 */
export interface JsonSchemaNode {
  readonly $ref?: string;
  readonly type?: string | readonly string[];
  readonly anyOf?: readonly JsonSchemaNode[];
  readonly allOf?: readonly JsonSchemaNode[];
  readonly items?: JsonSchemaNode;
  readonly additionalProperties?: boolean | JsonSchemaNode;
  readonly properties?: Readonly<Record<string, JsonSchemaNode>>;
  readonly required?: readonly string[];
  readonly description?: string;
  readonly title?: string;
  readonly $defs?: Readonly<Record<string, JsonSchemaNode>>;
}

/** Named definitions of a schema document, keyed by definition name. */
export type JsonSchemaDefinitions = Readonly<Record<string, JsonSchemaNode>>;
