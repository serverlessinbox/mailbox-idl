import type { GoTemplates } from './templates';

/** Turns a hand-written runtime template into a generated file for the configured package. */
export class RuntimeTemplateEmitter {
  private readonly templates: GoTemplates;

  public constructor(templates: GoTemplates) {
    this.templates = templates;
  }

  /**
   * Prefixes the generated-code header and renames the package. In doc.go the
   * package comment is renamed as well.
   */
  public emit(fileName: string, templateContent: string): string {
    const packageName = this.templates.packageName;
    let content = templateContent.replace(/^package\s+\w+/m, `package ${packageName}`);
    if (fileName === 'doc.go') {
      content = content.replace(/^\/\/ Package\s+\w+/m, `// Package ${packageName}`);
    }
    return this.templates.runtimeFileHeader() + content;
  }
}
