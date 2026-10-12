// Pins batch.ts: every manifest method needs a typed method on JmapBatch, since
// webmail-ui builds batched requests only through these.
import { MethodCatalog } from '../../schema/method-catalog';
import { SchemaNaming } from '../../schema/schema-naming';
import { sampleManifest } from '../../testing/sample-manifest';
import { BatchEmitter } from '../batch-emitter';
import { TsNaming } from '../ts-naming';
import { TsTemplates } from '../templates';

describe('BatchEmitter', () => {
  const source = new BatchEmitter(new TsTemplates(), new TsNaming()).emit(new MethodCatalog(sampleManifest, new SchemaNaming()));

  it('adds a typed JmapBatch method for each manifest method', () => {
    expect(source).toContain(
      "  EmailQuery(args: Methods['Email/query']['args']): CallHandle<'Email/query'> {\n    return this.call('Email/query', args);\n  }\n",
    );
    expect(source).toContain("  ThreadGet(args: Methods['Thread/get']['args']): CallHandle<'Thread/get'> {");
  });

  it('places the generated methods directly before the ref method', () => {
    expect(source).toMatch(/ThreadGet[^]*?\n {2}\}\n {2}ref<K extends/);
  });
});
