import * as fs from 'fs/promises';
import * as path from 'path';
import type { Writable } from 'stream';

import { MethodCatalog } from '../schema/method-catalog';
import type { SchemaLoader } from '../schema/schema-loader';
import type { SchemaNaming } from '../schema/schema-naming';
import { CoreTypesEmitter } from './core-types-emitter';
import type { GoFormatter } from './go-formatter';
import type { GoNaming } from './go-naming';
import { GoStructEmitter } from './go-struct-emitter';
import { GoStructFormatter } from './go-struct-formatter';
import { GoTypeMapper } from './go-type-mapper';
import { MethodFileEmitter } from './method-file-emitter';
import { RuntimeTemplateEmitter } from './runtime-template-emitter';
import type { RuntimeTemplateLoader } from './runtime-template-loader';
import type { GoTemplates } from './templates';
import { TypedApiEmitter } from './typed-api-emitter';

/**
 * Generates the Go SDK for the JMAP IDL into the output directory: core_types.go,
 * the runtime files copied from templates, one file per method args and response
 * schema, and typed_client.go and typed_batch.go. Go files left over from earlier
 * runs are removed, and the finished directory is formatted by the injected formatter.
 */
export class GoGenerator {
  private readonly outputDir: string;
  private readonly jmapRoot: string;
  private readonly loader: SchemaLoader;
  private readonly templateLoader: RuntimeTemplateLoader;
  private readonly schemaNaming: SchemaNaming;
  private readonly goNaming: GoNaming;
  private readonly templates: GoTemplates;
  private readonly formatter: GoFormatter;
  private readonly stdout: Writable;

  public constructor(
    outputDir: string,
    jmapRoot: string,
    loader: SchemaLoader,
    templateLoader: RuntimeTemplateLoader,
    schemaNaming: SchemaNaming,
    goNaming: GoNaming,
    templates: GoTemplates,
    formatter: GoFormatter,
    stdout: Writable,
  ) {
    this.outputDir = outputDir;
    this.jmapRoot = jmapRoot;
    this.loader = loader;
    this.templateLoader = templateLoader;
    this.schemaNaming = schemaNaming;
    this.goNaming = goNaming;
    this.templates = templates;
    this.formatter = formatter;
    this.stdout = stdout;
  }

  /** Writes every generated file into the output directory. */
  public async generate(): Promise<void> {
    await fs.mkdir(this.outputDir, { recursive: true });

    const catalog = new MethodCatalog(await this.loader.readManifest(), this.schemaNaming);
    const coreDefs = (await this.loader.readCoreTypesSchema()).$defs ?? {};
    const mapper = new GoTypeMapper(coreDefs);
    const structEmitter = new GoStructEmitter(mapper, this.goNaming, new GoStructFormatter(), this.templates);

    await this.writeCoreTypes(new CoreTypesEmitter(coreDefs, mapper, structEmitter, this.templates));
    await this.removeStaleGoFiles();
    await this.writeRuntimeFiles();
    await this.writeMethodFiles(catalog, new MethodFileEmitter(mapper, structEmitter, this.templates));
    await this.writeTypedApi(catalog);
    await this.formatter.format(this.outputDir);

    this.log(`\nDone. Generated core_types.go + ${catalog.methods.length * 2} method files + typed_client.go + typed_batch.go`);
  }

  private async writeCoreTypes(emitter: CoreTypesEmitter): Promise<void> {
    const output = emitter.emit();
    for (const missingDef of output.missingDefs) {
      this.log(`  WARN: def ${missingDef} not found in types.schema.json`);
    }
    await this.writeOutput('core_types.go', output.source);
    this.log('  wrote core_types.go');
  }

  private async removeStaleGoFiles(): Promise<void> {
    const keep = new Set(['core_types.go', ...this.templates.runtimeFileNames]);
    for (const fileName of await fs.readdir(this.outputDir)) {
      if (fileName.endsWith('.go') && !keep.has(fileName)) {
        await fs.unlink(path.join(this.outputDir, fileName));
        this.log(`  deleted stale file: ${fileName}`);
      }
    }
  }

  private async writeRuntimeFiles(): Promise<void> {
    const emitter = new RuntimeTemplateEmitter(this.templates);
    for (const fileName of this.templates.runtimeFileNames) {
      const template = await this.templateLoader.readRuntimeTemplate(fileName);
      await this.writeOutput(fileName, emitter.emit(fileName, template));
      this.log(`  wrote ${fileName} (from template)`);
    }
  }

  private async writeMethodFiles(catalog: MethodCatalog, emitter: MethodFileEmitter): Promise<void> {
    for (const method of catalog.methods) {
      await this.writeMethodSchemaFile(emitter, method.argsSchemaPath, method.argsBase, method.argsTypeName, method.refArgFields);
      await this.writeMethodSchemaFile(emitter, method.responseSchemaPath, method.responseBase, method.responseTypeName, new Set());
    }
  }

  private async writeMethodSchemaFile(
    emitter: MethodFileEmitter,
    schemaPath: string,
    schemaBase: string,
    typeName: string,
    refFields: ReadonlySet<string>,
  ): Promise<void> {
    const fileName = this.goNaming.fileName(schemaBase);
    this.log(`  generating ${schemaBase} → ${path.relative(this.jmapRoot, path.join(this.outputDir, fileName))}`);
    const schema = await this.loader.readMethodSchema(schemaPath);
    await this.writeOutput(fileName, emitter.emit(schema, typeName, refFields));
  }

  private async writeTypedApi(catalog: MethodCatalog): Promise<void> {
    const emitter = new TypedApiEmitter(this.goNaming, this.templates);
    await this.writeOutput('typed_client.go', emitter.emitClient(catalog));
    this.log('  wrote typed_client.go');
    await this.writeOutput('typed_batch.go', emitter.emitBatch(catalog));
    this.log('  wrote typed_batch.go');
  }

  private async writeOutput(fileName: string, content: string): Promise<void> {
    await fs.writeFile(path.join(this.outputDir, fileName), content, 'utf8');
  }

  private log(message: string): void {
    this.stdout.write(`${message}\n`);
  }
}
