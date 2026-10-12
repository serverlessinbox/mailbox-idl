/** Derives the TypeScript identifiers generated for a JMAP method name such as `Email/get`. */
export class TsNaming {
  /** `Email/get` becomes `EmailGet`, the name of its wrapper function and batch method. */
  public wrapperFunctionName(methodName: string): string {
    return this.pascalCase(methodName);
  }

  /** `Email/get` becomes `validateEmailGetResponse`, the import alias of its response validator. */
  public validatorAlias(methodName: string): string {
    return `validate${this.pascalCase(methodName)}Response`;
  }

  private pascalCase(text: string): string {
    return text
      .split(/[^a-zA-Z0-9]+/g)
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('');
  }
}
