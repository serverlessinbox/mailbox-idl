// Pins the template read: a missing template must abort generation with the
// template path in the message, not produce an SDK without its runtime file.
import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';

import { RuntimeTemplateLoader } from '../runtime-template-loader';

describe('RuntimeTemplateLoader', () => {
  let runtimeDir: string;
  let loader: RuntimeTemplateLoader;

  beforeEach(async () => {
    runtimeDir = await fs.mkdtemp(path.join(os.tmpdir(), 'runtime-templates-'));
    loader = new RuntimeTemplateLoader(runtimeDir);
  });

  afterEach(async () => {
    await fs.rm(runtimeDir, { recursive: true, force: true });
  });

  it('reads the .tmpl file that belongs to a runtime file name', async () => {
    await fs.writeFile(path.join(runtimeDir, 'client.go.tmpl'), 'package jmapsdk\n');

    await expect(loader.readRuntimeTemplate('client.go')).resolves.toBe('package jmapsdk\n');
  });

  it('names the template path when the file is missing', async () => {
    await expect(loader.readRuntimeTemplate('client.go')).rejects.toThrow(/Cannot read Go runtime template .*client\.go\.tmpl/);
  });
});
