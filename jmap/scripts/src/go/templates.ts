/**
 * Every text fragment the Go generator writes: file headers, package clauses,
 * struct scaffolding and the typed client and batch method bodies. Column
 * alignment of struct fields is left to gofmt.
 */
export class GoTemplates {
  /** The Go package name written into every generated file. */
  public readonly packageName: string;

  /** The runtime files copied from `go-runtime/<name>.tmpl`, in write order. */
  public readonly runtimeFileNames: readonly string[] = ['client.go', 'session.go', 'refs.go', 'batch.go', 'doc.go', 'shared.go'];

  /** The Go type of an argument that is either a literal id list or a result reference. */
  public readonly refFieldType = 'StringOrRef';

  /** The field comment of an argument that is either a literal id list or a result reference. */
  public readonly refFieldComment = '// StringIDs(...) for a literal list, Ref(handle, path) for a result reference.';

  public constructor(packageName: string) {
    this.packageName = packageName;
  }

  /** The first line of files generated from JSON Schemas. */
  public schemaFileHeader(): string {
    return '// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.';
  }

  /** The first line of files generated from the manifest. */
  public manifestFileHeader(): string {
    return '// Code generated from mailbox-idl/jmap manifest. DO NOT EDIT.';
  }

  /** The header written above a copied runtime template, including the blank line that follows it. */
  public runtimeFileHeader(): string {
    return '// Code generated from mailbox-idl/jmap. DO NOT EDIT.\n\n';
  }

  /** The package clause. */
  public packageClause(): string {
    return `package ${this.packageName}`;
  }

  /** The import of encoding/json that allOf structs need. */
  public jsonImport(): string {
    return 'import "encoding/json"';
  }

  /** The doc comment and declaration of the Keywords alias. */
  public keywordsAlias(): string[] {
    return [
      '// Keywords is a map of IMAP keyword → true. The presence of a key means the keyword is set (RFC 8621 §4.1.1).',
      'type Keywords = map[string]bool',
    ];
  }

  /** A type's doc comment, or undefined when there is no description. */
  public typeDocComment(typeName: string, description: string): string | undefined {
    return description ? `// ${typeName} ${description}`.trimEnd() : undefined;
  }

  /** A field's trailing comment, or undefined when there is no description. */
  public fieldComment(description: string): string | undefined {
    return description ? `// ${description}`.trimEnd() : undefined;
  }

  /** The opening line of a struct declaration. */
  public structOpen(typeName: string): string {
    return `type ${typeName} struct {`;
  }

  /** The closing line of a struct declaration. */
  public structClose(): string {
    return '}';
  }

  /** A struct field's JSON tag; optional fields carry `omitempty`. */
  public jsonTag(jsonKey: string, required: boolean): string {
    return required ? `\`json:"${jsonKey}"\`` : `\`json:"${jsonKey},omitempty"\``;
  }

  /** The lines of a struct that embeds `baseDefName` and keeps vendor-prefixed properties. */
  public allOfStruct(typeName: string, baseDefName: string): string[] {
    return [
      `// ${typeName} extends ${baseDefName} with vendor-prefixed properties.`,
      this.structOpen(typeName),
      `\t${baseDefName}`,
      '\t// captures sib: vendor-prefixed properties',
      '\tExtraProperties map[string]json.RawMessage `json:"-"`',
      this.structClose(),
    ];
  }

  /** The TypedClient method that executes one JMAP method, ending in a newline. */
  public typedClientMethod(goMethodName: string, methodName: string, argsType: string, responseType: string, capability: string): string {
    return [
      `// ${goMethodName} executes a single ${methodName} call and returns the parsed response.`,
      `func (tc *TypedClient) ${goMethodName}(ctx context.Context, args ${argsType}) (*${responseType}, error) {`,
      `\tb := NewBatch(${JSON.stringify(capability)})`,
      `\tb.Add(${JSON.stringify(methodName)}, args)`,
      '\tresp, err := tc.c.Do(ctx, b.Request())',
      '\tif err != nil {',
      '\t\treturn nil, err',
      '\t}',
      '\tif len(resp.MethodResponses) == 0 {',
      `\t\treturn nil, fmt.Errorf("jmapsdk: empty response for ${methodName}")`,
      '\t}',
      `\tvar result ${responseType}`,
      '\tif err := json.Unmarshal(resp.MethodResponses[0].Args, &result); err != nil {',
      '\t\treturn nil, err',
      '\t}',
      '\treturn &result, nil',
      '}',
      '',
    ].join('\n');
  }

  /** Contents of typed_client.go from its rendered methods. */
  public typedClientFile(methods: readonly string[]): string {
    return (
      `${this.manifestFileHeader()}\n\n` +
      `${this.packageClause()}\n\n` +
      'import (\n\t"context"\n\t"encoding/json"\n\t"fmt"\n)\n\n' +
      '// TypedClient wraps a raw Client and exposes one strongly-typed method per JMAP method.\n' +
      'type TypedClient struct{ c Client }\n\n' +
      '// NewTypedClient creates a TypedClient wrapping the given Client.\n' +
      'func NewTypedClient(c Client) *TypedClient { return &TypedClient{c: c} }\n\n' +
      methods.join('\n')
    );
  }

  /** The TypedBatch method that appends one JMAP method call, ending in a newline. */
  public typedBatchMethod(goMethodName: string, methodName: string, argsType: string, responseType: string): string {
    return [
      `// ${goMethodName} appends an ${methodName} call to the batch and returns a typed handle.`,
      `func (tb *TypedBatch) ${goMethodName}(args ${argsType}) BatchHandle[${responseType}] {`,
      `\tcallID := tb.b.Add(${JSON.stringify(methodName)}, args)`,
      `\treturn BatchHandle[${responseType}]{callID: callID, methodName: ${JSON.stringify(methodName)}}`,
      '}',
      '',
    ].join('\n');
  }

  /** Contents of typed_batch.go from its rendered methods. */
  public typedBatchFile(methods: readonly string[]): string {
    return `${this.manifestFileHeader()}\n\n${this.packageClause()}\n\n` + methods.join('\n');
  }
}
