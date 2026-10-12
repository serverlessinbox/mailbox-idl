import { compileFromFile } from 'json-schema-to-typescript';

import type { TsTemplates } from './templates';

/** Compiles one method schema file into the contents of its TypeScript type file. */
export class TypeEmitter {
  private readonly templates: TsTemplates;

  public constructor(templates: TsTemplates) {
    this.templates = templates;
  }

  /** Compiles the schema file; the string arrays of an args schema become readonly. */
  public async emit(schemaFile: string, schemaBase: string): Promise<string> {
    const compiled = await this.compileSchemaFile(schemaFile);
    return schemaBase.endsWith('.args') ? compiled.replace(/: string\[\]/g, ': readonly string[]') : compiled;
  }

  private async compileSchemaFile(schemaFile: string): Promise<string> {
    return compileFromFile(schemaFile, {
      bannerComment: this.templates.schemaBanner,
      style: {
        singleQuote: true,
      },
      additionalProperties: false,
    });
  }
}
