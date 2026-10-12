import Ajv2020 from 'ajv/dist/2020';
import * as path from 'path';

import { Cli, Command, Option, UsageError } from 'clipanion';

import { SchemaLoader } from '../schema/schema-loader';
import { SchemaNaming } from '../schema/schema-naming';
import { TsNaming } from '../ts/ts-naming';
import { TsGenerator } from '../ts/ts-generator';
import { TsTemplates } from '../ts/templates';

/** Generates the TypeScript client for the JMAP IDL into an output directory. */
export class GenerateTsCommand extends Command {
  public static override paths = [Command.Default];

  public static override usage = Command.Usage({
    description: 'Generate TypeScript types, validators and the typed client from the JMAP JSON Schemas.',
    examples: [['Generate into ./out/ts', '$0 --output-dir ./out/ts']],
  });

  public outputDir = Option.String('--output-dir', {
    env: 'OUTPUT_DIR',
    description: 'Directory the TypeScript files are written to. Defaults to the OUTPUT_DIR environment variable; one of the two is required.',
  });

  /** Builds the generator from the command options and runs it. */
  public async execute(): Promise<void> {
    if (this.outputDir === undefined) {
      throw new UsageError('--output-dir (or the OUTPUT_DIR environment variable) is required');
    }

    const jmapRoot = path.resolve(__dirname, '..', '..', '..');
    // Validate schemas against draft 2020-12 meta-schema. Use strict: false to allow
    // unknown keywords that are ignored by the generators.
    const ajv = new Ajv2020({ strict: false });
    const generator = new TsGenerator(
      this.outputDir,
      new SchemaLoader(jmapRoot, ajv),
      new SchemaNaming(),
      new TsNaming(),
      new TsTemplates(),
    );
    await generator.generate();
  }
}

if (require.main === module) {
  void Cli.from([GenerateTsCommand]).runExit(process.argv.slice(2));
}
