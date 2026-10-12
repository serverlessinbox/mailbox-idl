import type { MethodCatalog, MethodDescriptor } from '../schema/method-catalog';
import type { TsNaming } from './ts-naming';
import type { TsTemplates } from './templates';

/**
 * Renders methods.ts: the `Methods` map, the typed client factory, the
 * result-reference ("Dx") argument types and one wrapper function per method.
 */
export class MethodsEmitter {
  private readonly templates: TsTemplates;
  private readonly naming: TsNaming;

  public constructor(templates: TsTemplates, naming: TsNaming) {
    this.templates = templates;
    this.naming = naming;
  }

  /** Renders the complete contents of methods.ts for the catalog. */
  public emit(catalog: MethodCatalog): string {
    const methods = catalog.methods;
    return this.templates.methodsFile({
      typeImportLines: this.distinct(
        methods.flatMap((method) => [
          this.templates.typeImportLine(method.argsTypeName, method.argsBase),
          this.templates.typeImportLine(method.responseTypeName, method.responseBase),
        ]),
      ),
      hasAcceptedRefs: methods.some((method) => method.acceptedRefs.length > 0),
      capabilities: catalog.capabilities,
      methodTypeEntries: methods.map((method) =>
        this.templates.methodTypeEntry(
          method.name,
          this.argsTypeNameWithRefs(method),
          method.responseTypeName,
          method.capability,
        ),
      ),
      provideMappingLines: methods
        .filter((method) => method.providePaths.length > 0)
        .map((method) => this.templates.provideMappingLine(method.name, method.providePaths)),
      dxArgsTypes: methods.filter((method) => method.acceptedRefs.length > 0).map((method) => this.dxArgsType(method)),
      wrapperFunctions: methods.map((method) =>
        this.templates.wrapperFunction(
          this.naming.wrapperFunctionName(method.name),
          method.name,
          this.argsTypeNameWithRefs(method),
        ),
      ),
    });
  }

  private argsTypeNameWithRefs(method: MethodDescriptor): string {
    return method.acceptedRefs.length > 0 ? `${method.argsTypeName}Dx` : method.argsTypeName;
  }

  private dxArgsType(method: MethodDescriptor): string {
    const variants = method.acceptedRefs.map((accepted) =>
      this.templates.dxVariant(
        method.argsTypeName,
        accepted.targetProp,
        accepted.argKey,
        accepted.sourceMethod,
        accepted.sourceResponsePath,
      ),
    );
    return this.templates.dxArgsType(`${method.argsTypeName}Dx`, method.argsTypeName, variants);
  }

  private distinct(values: readonly string[]): string[] {
    return [...new Set(values)];
  }
}
