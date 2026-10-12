// Runs the real TypeScript generator over the repository's IDL into a temporary
// directory and pins the set of files a run produces.
import Ajv2020 from 'ajv/dist/2020';
import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';

import { SchemaLoader } from '../../schema/schema-loader';
import { SchemaNaming } from '../../schema/schema-naming';
import { TsGenerator } from '../ts-generator';
import { TsNaming } from '../ts-naming';
import { TsTemplates } from '../templates';

describe('TsGenerator', () => {
  const jmapRoot = path.resolve(__dirname, '..', '..', '..', '..');
  let outputDir: string;

  beforeAll(async () => {
    outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ts-generator-'));
    const ajv = new Ajv2020({ strict: false });
    await new TsGenerator(outputDir, new SchemaLoader(jmapRoot, ajv), new SchemaNaming(), new TsNaming(), new TsTemplates()).generate();
  }, 60000);

  afterAll(async () => {
    await fs.rm(outputDir, { recursive: true, force: true });
  });

  it('writes a type file and a validator for the Email/get response', async () => {
    const files = await fs.readdir(outputDir);

    expect(files).toEqual(expect.arrayContaining(['Email.get.args.ts', 'Email.get.response.ts', 'Email.get.response.validator.ts']));
  });

  it('writes the composed modules', async () => {
    const files = await fs.readdir(outputDir);

    expect(files).toEqual(expect.arrayContaining(['client.ts', 'session.ts', 'refs.ts', 'methods.ts', 'batch.ts', 'validators.ts', 'index.ts']));
  });

  it('exports the Email/get args type from the index', async () => {
    const index = await fs.readFile(path.join(outputDir, 'index.ts'), 'utf8');

    expect(index).toContain("export type { EmailGetArgs } from './Email.get.args';");
  });
});
