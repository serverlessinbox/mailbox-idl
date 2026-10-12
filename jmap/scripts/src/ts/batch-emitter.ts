import type { MethodCatalog } from '../schema/method-catalog';
import type { TsNaming } from './ts-naming';
import type { TsTemplates } from './templates';

/** Renders batch.ts: the batch builder with one typed method per JMAP method. */
export class BatchEmitter {
  private readonly templates: TsTemplates;
  private readonly naming: TsNaming;

  public constructor(templates: TsTemplates, naming: TsNaming) {
    this.templates = templates;
    this.naming = naming;
  }

  /** Renders the complete contents of batch.ts for the catalog. */
  public emit(catalog: MethodCatalog): string {
    return this.templates.batchFile(
      catalog.methods.map((method) =>
        this.templates.batchMethod(this.naming.wrapperFunctionName(method.name), method.name),
      ),
    );
  }
}
