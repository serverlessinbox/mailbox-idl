import type { JsonSchemaNode } from '../schema/json-schema';
import type { GoStructEmitter } from './go-struct-emitter';
import type { GoTypeMapper, GoTypeScope } from './go-type-mapper';
import type { GoTemplates } from './templates';

/** Renders the Go file of one method args or response schema. */
export class MethodFileEmitter {
  private readonly mapper: GoTypeMapper;
  private readonly structEmitter: GoStructEmitter;
  private readonly templates: GoTemplates;

  public constructor(mapper: GoTypeMapper, structEmitter: GoStructEmitter, templates: GoTemplates) {
    this.mapper = mapper;
    this.structEmitter = structEmitter;
    this.templates = templates;
  }

  /**
   * Renders the file for `schema`: a struct per local helper definition, named
   * after `typeName`, followed by the struct for the schema itself.
   * `refFields` are the properties that accept a result reference.
   */
  public emit(schema: JsonSchemaNode, typeName: string, refFields: ReadonlySet<string>): string {
    const localDefs = schema.$defs ?? {};
    const scope: GoTypeScope = { localDefs, localDefsPrefix: typeName };

    const parts: string[] = [this.templates.schemaFileHeader(), '', this.templates.packageClause(), ''];
    if (Object.values(localDefs).some((localDef) => localDef.allOf)) {
      parts.push(this.templates.jsonImport(), '');
    }

    for (const [localDefName, localDef] of Object.entries(localDefs)) {
      const helperStruct = this.helperStruct(typeName + localDefName, localDefName, localDef);
      if (helperStruct !== null) {
        parts.push(helperStruct, '');
      }
    }

    parts.push(this.structEmitter.emitStruct(typeName, schema, refFields, scope), '');
    return parts.join('\n');
  }

  private helperStruct(goTypeName: string, localDefName: string, localDef: JsonSchemaNode): string | null {
    if (this.mapper.isStringOnlyDef(localDefName) || this.mapper.isSkippedDef(localDefName) || localDefName === 'SetError') {
      return null;
    }
    if (localDef.allOf) {
      return this.structEmitter.emitAllOfStruct(goTypeName, localDef);
    }
    if (localDef.type === 'object' && localDef.properties) {
      return this.structEmitter.emitStruct(goTypeName, localDef, new Set(), this.mapper.globalScope);
    }
    return null;
  }
}
