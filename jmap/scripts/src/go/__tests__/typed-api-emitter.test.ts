// Pins typed_client.go and typed_batch.go: the generated Go must already be in
// gofmt layout, because no formatter runs after generation.
import { MethodCatalog } from '../../schema/method-catalog';
import { SchemaNaming } from '../../schema/schema-naming';
import { sampleManifest } from '../../testing/sample-manifest';
import { GoNaming } from '../go-naming';
import { GoTemplates } from '../templates';
import { TypedApiEmitter } from '../typed-api-emitter';

describe('TypedApiEmitter', () => {
  const emitter = new TypedApiEmitter(new GoNaming(), new GoTemplates('mypkg'));
  const catalog = new MethodCatalog(sampleManifest, new SchemaNaming());

  it('writes a TypedClient method that sends one call and decodes the first response', () => {
    const source = emitter.emitClient(catalog);

    expect(source).toContain('package mypkg\n');
    expect(source).toContain('func (tc *TypedClient) EmailGet(ctx context.Context, args EmailGetArgs) (*EmailGetResponse, error) {');
    expect(source).toContain('\tb := NewBatch("urn:ietf:params:jmap:mail")\n\tb.Add("Email/get", args)\n');
    expect(source).toContain('\tif err != nil {\n\t\treturn nil, err\n\t}\n');
    expect(source).toContain('\t\treturn nil, fmt.Errorf("jmapsdk: empty response for Email/get")\n');
  });

  it('separates the methods with one blank line', () => {
    expect(emitter.emitClient(catalog)).toContain('\treturn &result, nil\n}\n\n// EmailGet executes');
  });

  it('writes a TypedBatch method that returns a handle for the call', () => {
    const source = emitter.emitBatch(catalog);

    expect(source).toContain('func (tb *TypedBatch) ThreadGet(args ThreadGetArgs) BatchHandle[ThreadGetResponse] {');
    expect(source).toContain('\treturn BatchHandle[ThreadGetResponse]{callID: callID, methodName: "Thread/get"}\n');
  });
});
