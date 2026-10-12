import type { SchemaNaming } from '../schema/schema-naming';
import type { TsTemplates } from './templates';

/** Renders index.ts: the primary type of every schema plus the hand-composed modules. */
export class IndexEmitter {
  private readonly templates: TsTemplates;
  private readonly naming: SchemaNaming;

  public constructor(templates: TsTemplates, naming: SchemaNaming) {
    this.templates = templates;
    this.naming = naming;
  }

  /**
   * Renders the complete contents of index.ts. Only the primary type of each
   * schema is exported, so helper types of different schemas cannot collide.
   */
  public emit(schemaBases: readonly string[]): string {
    const lines = [
      ...schemaBases.map((base) => this.templates.typeExportLine(this.naming.typeName(base), base)),
      ...this.templates.moduleExportLines(),
    ];
    return lines.join('\n') + '\n';
  }
}
