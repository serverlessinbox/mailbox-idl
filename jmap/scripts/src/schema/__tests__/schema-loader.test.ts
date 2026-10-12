// Pins the validation boundary of the IDL documents: a malformed manifest or
// schema must fail with the file path in the message instead of reaching the
// generators as an untyped value.
import Ajv2020 from 'ajv/dist/2020';
import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';

import { SchemaLoader } from '../schema-loader';

describe('SchemaLoader', () => {
  let rootDir: string;
  let loader: SchemaLoader;

  const writeFile = async (relativePath: string, content: string): Promise<void> => {
    const target = path.join(rootDir, relativePath);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  };

  beforeEach(async () => {
    rootDir = await fs.mkdtemp(path.join(os.tmpdir(), 'schema-loader-'));
    const ajv = new Ajv2020({ strict: false });
    loader = new SchemaLoader(rootDir, ajv);
  });

  afterEach(async () => {
    await fs.rm(rootDir, { recursive: true, force: true });
  });

  it('reads a valid manifest', async () => {
    await writeFile('manifest.yaml', 'version: 1\ncapabilities:\n  - urn:a\nmethods: []\n');

    await expect(loader.readManifest()).resolves.toEqual({ version: 1, capabilities: ['urn:a'], methods: [] });
  });

  it('rejects a manifest method without a response schema and names the file', async () => {
    await writeFile('manifest.yaml', 'methods:\n  - name: A/get\n    capability: urn:a\n    argsSchema: a.json\n');

    await expect(loader.readManifest()).rejects.toThrow(/Invalid manifest .*manifest\.yaml.*responseSchema/);
  });

  it('reads a method schema relative to the root', async () => {
    await writeFile('schemas/methods/A.get.args.schema.json', '{"type":"object","required":["id"]}');

    await expect(loader.readMethodSchema('schemas/methods/A.get.args.schema.json')).resolves.toEqual({
      type: 'object',
      required: ['id'],
    });
  });

  it('rejects a schema whose keyword has the wrong shape and names the file', async () => {
    await writeFile('schemas/core/types.schema.json', '{"required":"id"}');

    await expect(loader.readCoreTypesSchema()).rejects.toThrow(/Invalid JSON Schema .*types\.schema\.json/);
  });

  it('rejects a schema with an invalid type keyword and names the path', async () => {
    await writeFile('schemas/core/types.schema.json', '{"type":5}');

    await expect(loader.readCoreTypesSchema()).rejects.toThrow(/Invalid JSON Schema .*types\.schema\.json/);
  });

  it('lists method schema files recursively in locale order and ignores other files', async () => {
    await writeFile('schemas/methods/B.get.args.schema.json', '{}');
    await writeFile('schemas/methods/nested/A.get.args.schema.json', '{}');
    await writeFile('schemas/methods/notes.txt', 'x');

    const files = await loader.listMethodSchemaFiles();

    expect(files.map((file) => path.relative(rootDir, file))).toEqual([
      path.join('schemas', 'methods', 'B.get.args.schema.json'),
      path.join('schemas', 'methods', 'nested', 'A.get.args.schema.json'),
    ]);
  });
});
