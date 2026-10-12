import Ajv2020, { type ValidateFunction } from 'ajv/dist/2020';
import fg from 'fast-glob';
import * as fs from 'fs/promises';
import * as path from 'path';
import YAML from 'yaml';

import type { JsonSchemaNode } from './json-schema';
import { isManifest, type Manifest } from './manifest';

/**
 * Loads and validates the documents of the jmap IDL directory: manifest.yaml,
 * the core types schema and the per-method schemas. Every document kind has its
 * own method, and each method returns a validated, typed value.
 */
export class SchemaLoader {
  private readonly rootDir: string;
  private readonly isSchema: ValidateFunction<JsonSchemaNode>;

  public constructor(rootDir: string, ajv: Ajv2020) {
    this.rootDir = rootDir;
    const isSchemaValidator = ajv.getSchema<JsonSchemaNode>('https://json-schema.org/draft/2020-12/schema');
    if (isSchemaValidator === undefined) {
      throw new Error('Draft 2020-12 meta-schema not found in Ajv instance');
    }
    this.isSchema = isSchemaValidator;
  }

  /** Reads manifest.yaml from the IDL root. */
  public async readManifest(): Promise<Manifest> {
    const manifestPath = path.join(this.rootDir, 'manifest.yaml');
    const text = await fs.readFile(manifestPath, 'utf8');
    const parsed: unknown = YAML.parse(text);
    const errors: string[] = [];
    if (!isManifest(parsed, { errors })) {
      throw new Error(`Invalid manifest ${manifestPath}: ${errors.join('; ')}`);
    }
    return parsed;
  }

  /** Reads schemas/core/types.schema.json. */
  public async readCoreTypesSchema(): Promise<JsonSchemaNode> {
    return this.readSchemaDocument(path.join(this.rootDir, 'schemas', 'core', 'types.schema.json'));
  }

  /** Reads a method schema addressed by its path relative to the IDL root, as written in the manifest. */
  public async readMethodSchema(relativePath: string): Promise<JsonSchemaNode> {
    return this.readSchemaDocument(path.join(this.rootDir, relativePath));
  }

  /** Lists the absolute paths of every `*.schema.json` below schemas/methods, in locale order. */
  public async listMethodSchemaFiles(): Promise<string[]> {
    const files = await fg(['**/*.schema.json'], {
      cwd: path.join(this.rootDir, 'schemas', 'methods'),
      absolute: true,
      onlyFiles: true,
    });
    return files.sort((a, b) => a.localeCompare(b));
  }

  private async readSchemaDocument(schemaPath: string): Promise<JsonSchemaNode> {
    const text = await fs.readFile(schemaPath, 'utf8');
    const parsed: unknown = JSON.parse(text);
    if (!this.isSchema(parsed)) {
      const errorMessages = this.isSchema.errors
        ? this.isSchema.errors.map((error) => `${error.instancePath || '$'}: ${error.message}`)
        : [];
      const details = errorMessages.length > 0 ? errorMessages.join('; ') : 'unknown error';
      throw new Error(`Invalid JSON Schema ${schemaPath}: ${details}`);
    }
    return parsed;
  }
}
