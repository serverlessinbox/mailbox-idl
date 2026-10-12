// Pins the readonly rewrite of args types: request arrays are inputs the caller
// owns, so generated args must accept readonly arrays while responses stay mutable.
import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';

import { TsTemplates } from '../templates';
import { TypeEmitter } from '../type-emitter';

describe('TypeEmitter', () => {
  let schemaDir: string;
  const emitter = new TypeEmitter(new TsTemplates());
  const schema = JSON.stringify({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Sample',
    type: 'object',
    properties: { ids: { type: 'array', items: { type: 'string' } } },
  });

  const emitSample = async (schemaBase: string): Promise<string> => {
    const schemaFile = path.join(schemaDir, `${schemaBase}.schema.json`);
    await fs.writeFile(schemaFile, schema);
    return emitter.emit(schemaFile, schemaBase);
  };

  beforeEach(async () => {
    schemaDir = await fs.mkdtemp(path.join(os.tmpdir(), 'type-emitter-'));
  });

  afterEach(async () => {
    await fs.rm(schemaDir, { recursive: true, force: true });
  });

  it('makes string arrays readonly in an args schema', async () => {
    expect(await emitSample('Sample.get.args')).toContain('ids?: readonly string[];');
  });

  it('leaves string arrays of a response schema mutable', async () => {
    expect(await emitSample('Sample.get.response')).toContain('ids?: string[];');
  });

  it('starts the file with the generated-code banner', async () => {
    const source = await emitSample('Sample.get.args');

    expect(source.startsWith('/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */')).toBe(true);
  });
});
