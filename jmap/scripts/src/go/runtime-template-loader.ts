import * as fs from 'fs/promises';
import * as path from 'path';

/** Reads the hand-written Go runtime templates stored as `<name>.tmpl` files. */
export class RuntimeTemplateLoader {
  private readonly runtimeDir: string;

  public constructor(runtimeDir: string) {
    this.runtimeDir = runtimeDir;
  }

  /** Reads the template of a runtime file such as `client.go`. */
  public async readRuntimeTemplate(fileName: string): Promise<string> {
    const templatePath = path.join(this.runtimeDir, `${fileName}.tmpl`);
    try {
      return await fs.readFile(templatePath, 'utf8');
    } catch (error) {
      throw new Error(`Cannot read Go runtime template ${templatePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
