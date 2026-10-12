import * as fs from 'fs/promises';
import * as path from 'path';

import { MethodCatalog } from '../schema/method-catalog';
import type { SchemaLoader } from '../schema/schema-loader';
import type { SchemaNaming } from '../schema/schema-naming';
import { BatchEmitter } from './batch-emitter';
import { IndexEmitter } from './index-emitter';
import { MethodsEmitter } from './methods-emitter';
import type { TsNaming } from './ts-naming';
import type { TsTemplates } from './templates';
import { TypeEmitter } from './type-emitter';
import { ValidatorEmitter, type ValidatorEntry } from './validator-emitter';

/**
 * Generates the TypeScript client for the JMAP IDL: one type file per method
 * schema, one AJV validator per response, and the client, session, refs,
 * methods, batch and index modules, all into the output directory.
 */
export class TsGenerator {
  private readonly outputDir: string;
  private readonly loader: SchemaLoader;
  private readonly schemaNaming: SchemaNaming;
  private readonly tsNaming: TsNaming;
  private readonly templates: TsTemplates;

  public constructor(
    outputDir: string,
    loader: SchemaLoader,
    schemaNaming: SchemaNaming,
    tsNaming: TsNaming,
    templates: TsTemplates,
  ) {
    this.outputDir = outputDir;
    this.loader = loader;
    this.schemaNaming = schemaNaming;
    this.tsNaming = tsNaming;
    this.templates = templates;
  }

  /** Writes every generated file into the output directory. */
  public async generate(): Promise<void> {
    await fs.mkdir(this.outputDir, { recursive: true });

    const schemaBases = await this.writeSchemaTypes();
    const catalog = new MethodCatalog(await this.loader.readManifest(), this.schemaNaming);

    await this.writeOutput('client.ts', this.templates.clientFile());
    await this.writeValidators(catalog);
    await this.writeOutput('session.ts', this.templates.sessionFile());
    await this.writeOutput('refs.ts', this.templates.refsFile());
    await this.writeOutput('methods.ts', new MethodsEmitter(this.templates, this.tsNaming).emit(catalog));
    await this.writeOutput('batch.ts', new BatchEmitter(this.templates, this.tsNaming).emit(catalog));
    await this.writeOutput('index.ts', new IndexEmitter(this.templates, this.schemaNaming).emit(schemaBases));
  }

  private async writeSchemaTypes(): Promise<string[]> {
    const typeEmitter = new TypeEmitter(this.templates);
    const schemaBases: string[] = [];
    for (const schemaFile of await this.loader.listMethodSchemaFiles()) {
      const schemaBase = this.schemaNaming.schemaBase(schemaFile);
      await this.writeOutput(`${schemaBase}.ts`, await typeEmitter.emit(schemaFile, schemaBase));
      schemaBases.push(schemaBase);
    }
    return schemaBases;
  }

  private async writeValidators(catalog: MethodCatalog): Promise<void> {
    const validatorEmitter = new ValidatorEmitter(
      await this.loader.readCoreTypesSchema(),
      this.templates,
      this.tsNaming,
    );
    const entries: ValidatorEntry[] = [];
    for (const method of catalog.methods) {
      const responseSchema = await this.loader.readMethodSchema(method.responseSchemaPath);
      await this.writeOutput(`${method.responseBase}.validator.ts`, validatorEmitter.emitValidator(responseSchema));
      entries.push({ methodName: method.name, responseBase: method.responseBase });
    }
    await this.writeOutput('validators.ts', validatorEmitter.emitValidatorsFile(entries));
  }

  private async writeOutput(fileName: string, content: string): Promise<void> {
    await fs.writeFile(path.join(this.outputDir, fileName), content, 'utf8');
  }
}
