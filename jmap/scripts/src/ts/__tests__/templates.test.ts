// Pins the branches of the parameterized TypeScript templates that the
// generated runtime output depends on but the emitters do not always reach.
import { TsTemplates } from '../templates';

describe('TsTemplates', () => {
  const templates = new TsTemplates();

  it('wraps validators that AJV compiled without a recognizable function as always valid', () => {
    expect(templates.validatorFile('// empty', null)).toContain(
      '// empty\n\nexport function validateResponse(_data: unknown): boolean { return true; }\n',
    );
  });

  it('forwards the AJV errors of the named function from validateResponse', () => {
    expect(templates.validatorFile('function validate0() {}', 'validate0')).toContain(
      'validateResponse.errors = validate0.errors; return ok; }\n',
    );
  });

  it('joins several provided paths of one method into a union', () => {
    expect(templates.provideMappingLine('Email/query', ['/ids', '/queryState'])).toBe("  'Email/query': '/ids' | '/queryState'");
  });

  it('declares a Dx type as the plain args type plus one variant per reference', () => {
    expect(templates.dxArgsType('FooDx', 'Foo', ['  | (A)', '  | (B)'])).toBe('export type FooDx =\n  | Foo\n  | (A)\n  | (B);\n');
  });
});
