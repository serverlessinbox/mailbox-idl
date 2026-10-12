import Ajv2020 from 'ajv/dist/2020';
import * as path from 'path';

import { Cli, Command, Option, UsageError } from 'clipanion';

import { GoFormatter } from '../go/go-formatter';
import { GoGenerator } from '../go/go-generator';
import { GoNaming } from '../go/go-naming';
import { RuntimeTemplateLoader } from '../go/runtime-template-loader';
import { GoTemplates } from '../go/templates';
import { SchemaLoader } from '../schema/schema-loader';
import { SchemaNaming } from '../schema/schema-naming';

/** Generates the Go SDK for the JMAP IDL into an output directory. */
export class GenerateGoCommand extends Command {
  public static override paths = [Command.Default];

  public static override usage = Command.Usage({
    description: 'Generate Go types, the typed client and the runtime files from the JMAP JSON Schemas.',
    examples: [['Generate package jmapsdk into ./out/go', '$0 --output-dir ./out/go --package jmapsdk']],
  });

  public outputDir = Option.String('--output-dir', {
    env: 'OUTPUT_DIR',
    description: 'Directory the Go files are written to. Defaults to the OUTPUT_DIR environment variable; one of the two is required.',
  });

  public packageName = Option.String('--package', 'jmapsdk', {
    env: 'PACKAGE',
    description: 'Go package name written into every generated file. Defaults to the PACKAGE environment variable, then to jmapsdk.',
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
    const generator = new GoGenerator(
      this.outputDir,
      jmapRoot,
      new SchemaLoader(jmapRoot, ajv),
      new RuntimeTemplateLoader(path.join(jmapRoot, 'scripts', 'go-runtime')),
      new SchemaNaming(),
      new GoNaming(),
      new GoTemplates(this.packageName),
      new GoFormatter('gofmt'),
      this.context.stdout,
    );
    await generator.generate();
  }
}

if (require.main === module) {
  void Cli.from([GenerateGoCommand]).runExit(process.argv.slice(2));
}
