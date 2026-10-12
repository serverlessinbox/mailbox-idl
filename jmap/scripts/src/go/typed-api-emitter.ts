import type { MethodCatalog } from '../schema/method-catalog';
import type { GoNaming } from './go-naming';
import type { GoTemplates } from './templates';

/** Renders typed_client.go and typed_batch.go: one strongly typed Go method per JMAP method. */
export class TypedApiEmitter {
  private readonly naming: GoNaming;
  private readonly templates: GoTemplates;

  public constructor(naming: GoNaming, templates: GoTemplates) {
    this.naming = naming;
    this.templates = templates;
  }

  /** Renders typed_client.go. */
  public emitClient(catalog: MethodCatalog): string {
    return this.templates.typedClientFile(
      catalog.methods.map((method) =>
        this.templates.typedClientMethod(
          this.naming.methodName(method.name),
          method.name,
          method.argsTypeName,
          method.responseTypeName,
          method.capability,
        ),
      ),
    );
  }

  /** Renders typed_batch.go. */
  public emitBatch(catalog: MethodCatalog): string {
    return this.templates.typedBatchFile(
      catalog.methods.map((method) =>
        this.templates.typedBatchMethod(
          this.naming.methodName(method.name),
          method.name,
          method.argsTypeName,
          method.responseTypeName,
        ),
      ),
    );
  }
}
