import * as path from 'path';

/** Derives the names that both generators share from schema file paths. */
export class SchemaNaming {
  /** `schemas/methods/Email.get.args.schema.json` becomes `Email.get.args`. */
  public schemaBase(schemaPath: string): string {
    return path.basename(schemaPath).replace(/\.schema\.json$/, '');
  }

  /** `Email.get.args` becomes `EmailGetArgs`. */
  public typeName(schemaBase: string): string {
    return schemaBase
      .split('.')
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('');
  }
}
