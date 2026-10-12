// Runs the real gofmt over a temporary directory. The generator relies on this
// step for struct field alignment, so a formatter that silently skips the
// directory or swallows a gofmt failure ships unaligned or broken Go.
import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';

import { GoFormatter } from '../go-formatter';

describe('GoFormatter', () => {
  const formatter = new GoFormatter('gofmt');
  let directory: string;

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'go-formatter-'));
  });

  afterEach(async () => {
    await fs.rm(directory, { recursive: true, force: true });
  });

  it('rewrites an unformatted Go file in place', async () => {
    const file = path.join(directory, 'sample.go');
    await fs.writeFile(file, 'package sample\n\ntype T struct {\n\tA string `json:"a"` // first\n\tLongName int `json:"b"` // second\n}\n');

    await formatter.format(directory);

    expect(await fs.readFile(file, 'utf8')).toBe(
      'package sample\n\ntype T struct {\n\tA        string `json:"a"` // first\n\tLongName int    `json:"b"` // second\n}\n',
    );
  });

  it('rejects with the gofmt stderr when a file does not parse', async () => {
    await fs.writeFile(path.join(directory, 'broken.go'), 'package sample\n\nfunc (\n');

    await expect(formatter.format(directory)).rejects.toThrow(/gofmt -w .* failed: .*broken\.go/);
  });

  it('rejects with a clear message when gofmt is not on PATH', async () => {
    const missing = new GoFormatter('gofmt-that-does-not-exist');

    await expect(missing.format(directory)).rejects.toThrow('gofmt-that-does-not-exist was not found on PATH');
  });
});
