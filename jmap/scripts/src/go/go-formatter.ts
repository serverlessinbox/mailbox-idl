import { execFile } from 'child_process';

/** Formats the Go files of a directory in place by running the `gofmt` binary on it. */
export class GoFormatter {
  private readonly gofmtExecutable: string;

  /** `gofmtExecutable` is the gofmt command name or path, resolved through PATH when it has no directory. */
  public constructor(gofmtExecutable: string) {
    this.gofmtExecutable = gofmtExecutable;
  }

  /**
   * Runs `gofmt -w` on the directory. Rejects with the gofmt stderr when it
   * exits non-zero, and with an install hint when gofmt cannot be found.
   */
  public async format(directory: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      execFile(this.gofmtExecutable, ['-w', directory], (error, _stdout, stderr) => {
        if (error === null) {
          resolve();
          return;
        }
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          reject(new Error(`${this.gofmtExecutable} was not found on PATH; install the Go toolchain to format the generated Go files`));
          return;
        }
        reject(new Error(`gofmt -w ${directory} failed: ${stderr.trim() || error.message}`));
      });
    });
  }
}
