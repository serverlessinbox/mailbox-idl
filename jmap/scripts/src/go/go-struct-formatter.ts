/** One field of a generated Go struct. */
export interface GoStructField {
  readonly name: string;
  readonly type: string;
  readonly tag: string;
  /** The trailing `// …` comment, when the field has one. */
  readonly comment: string | undefined;
}

/**
 * Renders struct fields as tab-indented lines with single spaces between the
 * parts. Column alignment is left to the gofmt run that follows generation.
 */
export class GoStructFormatter {
  /** Returns one tab-indented line per field. */
  public format(fields: readonly GoStructField[]): string[] {
    return fields.map((field) => {
      const declaration = `\t${field.name} ${field.type} ${field.tag}`;
      return field.comment === undefined ? declaration : `${declaration} ${field.comment}`;
    });
  }
}
