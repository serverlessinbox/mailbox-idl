// Pins methods.ts: the Methods map must type a result-reference-capable method
// with its Dx args type, otherwise batch callers cannot pass a reference.
import { MethodCatalog } from '../../schema/method-catalog';
import { SchemaNaming } from '../../schema/schema-naming';
import { sampleManifest } from '../../testing/sample-manifest';
import { MethodsEmitter } from '../methods-emitter';
import { TsNaming } from '../ts-naming';
import { TsTemplates } from '../templates';

describe('MethodsEmitter', () => {
  const emitter = new MethodsEmitter(new TsTemplates(), new TsNaming());
  const source = emitter.emit(new MethodCatalog(sampleManifest, new SchemaNaming()));

  it('types a method that accepts a reference with its Dx args type', () => {
    expect(source).toContain(
      "  'Email/get': { args: EmailGetArgsDx; response: EmailGetResponse; capability: 'urn:ietf:params:jmap:mail' }",
    );
    expect(source).toContain("  | (Omit<EmailGetArgs, 'ids'> & { '#ids': ResultRef<'Email/query', '/ids'>; ids?: never })");
  });

  it('keeps the plain args type for a method without references', () => {
    expect(source).toContain('  \'Thread/get\': { args: ThreadGetArgs;');
    expect(source).not.toContain('ThreadGetArgsDx');
  });

  it('maps a providing method to its response paths', () => {
    expect(source).toContain("export type DxProvidePathsByMethod = {\n  'Email/query': '/ids'\n};");
  });

  it('imports the ResultRef type only when a method accepts a reference', () => {
    const withoutRefs = emitter.emit(new MethodCatalog({ methods: sampleManifest.methods?.slice(2) }, new SchemaNaming()));

    expect(source).toContain("import type { ResultRef } from './refs';");
    expect(withoutRefs).not.toContain("import type { ResultRef } from './refs';");
    expect(withoutRefs).toContain('export type DxProvidePathsByMethod = {};');
  });

  it('writes one wrapper function per method using the Dx args type where it applies', () => {
    expect(source).toContain(
      "export const EmailGet = (client: JmapApiClient, args: EmailGetArgsDx) => client.call('Email/get', args);",
    );
    expect(source).toContain('export const ThreadGet = (client: JmapApiClient, args: ThreadGetArgs)');
  });

  it('emits the capability list as the default using value', () => {
    expect(source).toContain('export const defaultUsing = [\n  "urn:ietf:params:jmap:core",\n  "urn:ietf:params:jmap:mail"\n] as const;');
  });
});
