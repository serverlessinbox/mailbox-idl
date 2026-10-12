import type { Manifest, ManifestMethod, ResultRefAccept } from './manifest';
import type { SchemaNaming } from './schema-naming';

/** A result reference accepted by a method, reduced to the parts the TypeScript generator emits. */
export interface AcceptedResultRef {
  readonly argKey: string;
  readonly targetArgPath: string;
  readonly targetProp: string;
  readonly sourceMethod: string;
  readonly sourceResponsePath: string;
}

/** A manifest method together with the names and result-reference data derived from it. */
export interface MethodDescriptor {
  readonly name: string;
  readonly capability: string;
  readonly argsSchemaPath: string;
  readonly responseSchemaPath: string;
  readonly argsBase: string;
  readonly responseBase: string;
  readonly argsTypeName: string;
  readonly responseTypeName: string;
  /** Distinct response pointers other methods may reference. */
  readonly providePaths: readonly string[];
  /** Accepted references that point at a top-level argument and name a complete source. */
  readonly acceptedRefs: readonly AcceptedResultRef[];
  /** Names of the arguments, without the leading slash, that accept a result reference. */
  readonly refArgFields: ReadonlySet<string>;
}

/**
 * The methods of manifest.yaml in manifest order, with schema names resolved and
 * result-reference declarations normalized. It carries no generator-specific output.
 */
export class MethodCatalog {
  public readonly capabilities: readonly string[];
  public readonly methods: readonly MethodDescriptor[];

  public constructor(manifest: Manifest, naming: SchemaNaming) {
    this.capabilities = manifest.capabilities ?? [];
    this.methods = (manifest.methods ?? []).map((method) => this.describe(method, naming));
  }

  private describe(method: ManifestMethod, naming: SchemaNaming): MethodDescriptor {
    const resultRefs = method.dx?.resultRefs;
    const argsBase = naming.schemaBase(method.argsSchema);
    const responseBase = naming.schemaBase(method.responseSchema);
    const accepts = resultRefs?.accepts ?? [];

    return {
      name: method.name,
      capability: method.capability,
      argsSchemaPath: method.argsSchema,
      responseSchemaPath: method.responseSchema,
      argsBase,
      responseBase,
      argsTypeName: naming.typeName(argsBase),
      responseTypeName: naming.typeName(responseBase),
      providePaths: this.distinct(
        (resultRefs?.provides ?? [])
          .map((provide) => this.pointerOrUndefined(provide.responsePath))
          .filter((pointer): pointer is string => pointer !== undefined),
      ),
      acceptedRefs: accepts.flatMap((accept) => this.acceptedRefOrNothing(accept)),
      refArgFields: new Set(
        accepts
          .filter((accept) => accept.targetArgPath.startsWith('/'))
          .map((accept) => accept.targetArgPath.slice(1)),
      ),
    };
  }

  private acceptedRefOrNothing(accept: ResultRefAccept): AcceptedResultRef[] {
    const targetArgPath = this.pointerOrUndefined(accept.targetArgPath);
    const sourceResponsePath = this.pointerOrUndefined(accept.source.responsePath);
    const targetProp = targetArgPath === undefined ? undefined : this.topLevelProperty(targetArgPath);
    if (!accept.argKey || !targetArgPath || !accept.source.method || !sourceResponsePath || !targetProp) {
      return [];
    }
    return [
      {
        argKey: accept.argKey,
        targetArgPath,
        targetProp,
        sourceMethod: accept.source.method,
        sourceResponsePath,
      },
    ];
  }

  private pointerOrUndefined(pointer: string): string | undefined {
    return pointer.startsWith('/') ? pointer : undefined;
  }

  private topLevelProperty(pointer: string): string | undefined {
    const parts = pointer.split('/').filter(Boolean);
    return parts.length === 1 ? parts[0] : undefined;
  }

  private distinct(values: readonly string[]): string[] {
    return [...new Set(values)];
  }
}
