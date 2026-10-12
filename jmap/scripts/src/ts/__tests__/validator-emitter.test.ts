// Pins the standalone validators: the generated file must not depend on AJV at
// runtime and must expose a single local validateResponse, because validators.ts
// imports that name from every response validator.
import type { JsonSchemaNode } from '../../schema/json-schema';
import { TsNaming } from '../ts-naming';
import { TsTemplates } from '../templates';
import { ValidatorEmitter } from '../validator-emitter';

describe('ValidatorEmitter', () => {
  const coreTypes: JsonSchemaNode = { $defs: { Id: { type: 'string' } } };
  const emitter = new ValidatorEmitter(coreTypes, new TsTemplates(), new TsNaming());
  const responseSchema: JsonSchemaNode = {
    type: 'object',
    required: ['state'],
    properties: { state: { type: 'string' } },
  };

  it('wraps the compiled function as validateResponse without a default export', () => {
    const source = emitter.emitValidator(responseSchema);

    expect(source).toMatch(/export function validateResponse\(data: unknown\): boolean \{ const ok = validate\d+\(data\);/);
    expect(source).not.toMatch(/export default/);
    expect(source).not.toMatch(/export const validate =/);
  });

  it('marks the file as generated and exempt from linting and type checks', () => {
    const source = emitter.emitValidator(responseSchema);

    expect(source.startsWith('/* Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT. */\n/* eslint-disable */\n// @ts-nocheck\n')).toBe(true);
  });

  it('imports and maps the validator of every method under its alias', () => {
    const source = emitter.emitValidatorsFile([
      { methodName: 'Email/get', responseBase: 'Email.get.response' },
      { methodName: 'Thread/get', responseBase: 'Thread.get.response' },
    ]);

    expect(source).toContain("import { validateResponse as validateEmailGetResponse } from './Email.get.response.validator';");
    expect(source).toContain('  "Email/get": validateEmailGetResponse,\n  "Thread/get": validateThreadGetResponse\n};');
  });
});
