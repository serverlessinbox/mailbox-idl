// Runs the real Go generator over the repository's IDL into a temporary
// directory. Pins the output set and the cleanup of files from earlier runs,
// which the generator must remove while leaving go.mod in place.
import Ajv2020 from 'ajv/dist/2020';
import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { PassThrough } from 'stream';

import { SchemaLoader } from '../../schema/schema-loader';
import { SchemaNaming } from '../../schema/schema-naming';
import { GoFormatter } from '../go-formatter';
import { GoGenerator } from '../go-generator';
import { GoNaming } from '../go-naming';
import { RuntimeTemplateLoader } from '../runtime-template-loader';
import { GoTemplates } from '../templates';

/** Stands in for gofmt: records the directory and the files present when formatting was requested. */
class RecordingGoFormatter extends GoFormatter {
  public readonly formattedDirectories: string[] = [];
  public filesAtFormatTime: string[] = [];

  public constructor() {
    super('unused-gofmt');
  }

  public override async format(directory: string): Promise<void> {
    this.formattedDirectories.push(directory);
    this.filesAtFormatTime = await fs.readdir(directory);
  }
}

describe('GoGenerator', () => {
  const jmapRoot = path.resolve(__dirname, '..', '..', '..', '..');
  const formatter = new RecordingGoFormatter();
  let outputDir: string;

  beforeAll(async () => {
    outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'go-generator-'));
    await fs.writeFile(path.join(outputDir, 'stale.go'), 'package old\n');
    await fs.writeFile(path.join(outputDir, 'go.mod'), 'module example\n');
    const ajv = new Ajv2020({ strict: false });
    await new GoGenerator(
      outputDir,
      jmapRoot,
      new SchemaLoader(jmapRoot, ajv),
      new RuntimeTemplateLoader(path.join(jmapRoot, 'scripts', 'go-runtime')),
      new SchemaNaming(),
      new GoNaming(),
      new GoTemplates('mypkg'),
      formatter,
      new PassThrough(),
    ).generate();
  }, 60000);

  afterAll(async () => {
    await fs.rm(outputDir, { recursive: true, force: true });
  });

  it('removes Go files left from earlier runs and keeps go.mod', async () => {
    const files = await fs.readdir(outputDir);

    expect(files).not.toContain('stale.go');
    expect(files).toContain('go.mod');
  });

  it('writes core types, the runtime files, the typed API and a file per method schema', async () => {
    const files = await fs.readdir(outputDir);

    expect(files).toEqual(
      expect.arrayContaining(['core_types.go', 'client.go', 'doc.go', 'typed_client.go', 'typed_batch.go', 'email_get_args.go', 'email_get_response.go']),
    );
  });

  it('formats the output directory once, after every file has been written', async () => {
    expect(formatter.formattedDirectories).toEqual([outputDir]);
    expect(formatter.filesAtFormatTime).toEqual(expect.arrayContaining(['core_types.go', 'typed_client.go', 'typed_batch.go', 'email_get_args.go']));
  });

  it('writes the configured package name into generated and copied files', async () => {
    expect(await fs.readFile(path.join(outputDir, 'email_get_args.go'), 'utf8')).toContain('\npackage mypkg\n');
    expect(await fs.readFile(path.join(outputDir, 'client.go'), 'utf8')).toContain('\npackage mypkg\n');
  });
});
