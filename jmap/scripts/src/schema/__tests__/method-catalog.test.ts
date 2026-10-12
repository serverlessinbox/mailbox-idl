// Pins how manifest result-reference declarations are normalized. The TypeScript
// generator emits only well-formed top-level references while the Go generator
// marks every slash-prefixed target, so both views must stay distinct.
import { sampleManifest } from '../../testing/sample-manifest';
import { MethodCatalog } from '../method-catalog';
import type { Manifest } from '../manifest';
import { SchemaNaming } from '../schema-naming';

const naming = new SchemaNaming();

function methodWithAccepts(targetArgPath: string, sourceResponsePath: string): Manifest {
  return {
    methods: [
      {
        name: 'Foo/get',
        capability: 'urn:test',
        argsSchema: 'schemas/methods/Foo.get.args.schema.json',
        responseSchema: 'schemas/methods/Foo.get.response.schema.json',
        dx: { resultRefs: { accepts: [{ argKey: '#x', targetArgPath, source: { method: 'Foo/query', responsePath: sourceResponsePath } }] } },
      },
    ],
  };
}

describe('MethodCatalog', () => {
  it('derives schema bases and type names for args and response', () => {
    const [query] = new MethodCatalog(sampleManifest, naming).methods;

    expect(query).toMatchObject({
      name: 'Email/query',
      argsBase: 'Email.query.args',
      responseBase: 'Email.query.response',
      argsTypeName: 'EmailQueryArgs',
      responseTypeName: 'EmailQueryResponse',
    });
  });

  it('lists a provided path once however often it is declared', () => {
    const [query] = new MethodCatalog(sampleManifest, naming).methods;

    expect(query.providePaths).toEqual(['/ids']);
  });

  it('keeps an accepted reference to a top-level argument', () => {
    const [, get] = new MethodCatalog(sampleManifest, naming).methods;

    expect(get.acceptedRefs).toEqual([
      { argKey: '#ids', targetArgPath: '/ids', targetProp: 'ids', sourceMethod: 'Email/query', sourceResponsePath: '/ids' },
    ]);
    expect([...get.refArgFields]).toEqual(['ids']);
  });

  it('drops a nested target from the accepted references but still marks it for Go', () => {
    const [method] = new MethodCatalog(methodWithAccepts('/filter/inMailbox', '/ids'), naming).methods;

    expect(method.acceptedRefs).toEqual([]);
    expect([...method.refArgFields]).toEqual(['filter/inMailbox']);
  });

  it('drops a reference whose source path is not a JSON pointer', () => {
    const [method] = new MethodCatalog(methodWithAccepts('/ids', 'ids'), naming).methods;

    expect(method.acceptedRefs).toEqual([]);
  });

  it('treats a missing capabilities or methods list as empty', () => {
    const catalog = new MethodCatalog({}, naming);

    expect(catalog.capabilities).toEqual([]);
    expect(catalog.methods).toEqual([]);
  });
});
