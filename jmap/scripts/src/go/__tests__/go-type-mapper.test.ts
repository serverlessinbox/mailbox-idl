// Pins the JSON Schema to Go type mapping branch by branch: a wrong pointer or
// a wrong definition fallthrough silently changes the wire shape of the Go SDK.
import type { JsonSchemaDefinitions, JsonSchemaNode } from '../../schema/json-schema';
import { GoTypeMapper, type GoTypeScope } from '../go-type-mapper';

describe('GoTypeMapper', () => {
  const coreDefs: JsonSchemaDefinitions = { Mailbox: { type: 'object' }, SetError: { type: 'object' } };
  const mapper = new GoTypeMapper(coreDefs);
  const global = mapper.globalScope;

  const goType = (schema: JsonSchemaNode, required = true, scope: GoTypeScope = global): string => mapper.map(schema, required, scope);

  it.each([
    [{ type: 'string' }, true, 'string'],
    [{ type: 'string' }, false, '*string'],
    [{ type: 'integer' }, false, '*int64'],
    [{ type: 'number' }, true, 'float64'],
    [{ type: 'boolean' }, false, '*bool'],
    [{ type: 'null' }, true, 'any'],
    [{}, true, 'any'],
  ] satisfies [JsonSchemaNode, boolean, string][])('maps %j (required=%s) to %s', (schema, required, expected) => {
    expect(goType(schema, required)).toBe(expected);
  });

  it('maps an array to a slice of its item type, pointer or not', () => {
    expect(goType({ type: 'array', items: { type: 'string' } }, false)).toBe('[]string');
    expect(goType({ type: 'array' })).toBe('[]any');
  });

  it('maps an object to a map of its additionalProperties type, else to map[string]any', () => {
    expect(goType({ type: 'object', additionalProperties: { type: 'boolean' } })).toBe('map[string]bool');
    expect(goType({ type: 'object', additionalProperties: true })).toBe('map[string]any');
    expect(goType({ type: 'object', properties: { a: { type: 'string' } } })).toBe('map[string]any');
  });

  it('maps a nullable type list to a pointer unless it is already a slice', () => {
    expect(goType({ type: ['string', 'null'] })).toBe('*string');
    expect(goType({ type: ['array', 'null'], items: { type: 'string' } })).toBe('[]string');
    expect(goType({ type: ['string', 'integer'] })).toBe('any');
  });

  it('unwraps a nullable anyOf and points it unless it is a map or slice', () => {
    expect(goType({ anyOf: [{ type: 'string' }, { type: 'null' }] })).toBe('*string');
    expect(goType({ anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'null' }] })).toBe('[]string');
  });

  it('points a non-required anyOf member and leaves a required one alone', () => {
    expect(goType({ anyOf: [{ type: 'string' }, {}] }, false)).toBe('*string');
    expect(goType({ anyOf: [{ type: 'string' }, {}] }, true)).toBe('string');
  });

  it('maps an anyOf with several non-null members to any', () => {
    expect(goType({ anyOf: [{ type: 'string' }, { type: 'integer' }] })).toBe('any');
  });

  it('maps a ref to a string-only definition to string and to a core definition to its name', () => {
    expect(goType({ $ref: '../core/types.schema.json#/$defs/EmailId' })).toBe('string');
    expect(goType({ $ref: '#/$defs/EmailId' }, false)).toBe('*string');
    expect(goType({ $ref: '../core/types.schema.json#/$defs/Mailbox' })).toBe('Mailbox');
  });

  it('maps a ref that is not a definition reference to any', () => {
    expect(goType({ $ref: 'other.json' })).toBe('any');
  });

  it('prefixes a local definition with the scope prefix', () => {
    const scope: GoTypeScope = { localDefs: { Patch: { type: 'object' } }, localDefsPrefix: 'EmailSetArgs' };

    expect(goType({ $ref: '#/$defs/Patch' }, true, scope)).toBe('EmailSetArgsPatch');
  });

  it('inlines a local string definition as string', () => {
    const scope: GoTypeScope = { localDefs: { Token: { type: 'string' } }, localDefsPrefix: 'X' };

    expect(goType({ $ref: '#/$defs/Token' }, false, scope)).toBe('*string');
  });

  it('uses the core name for a local redeclaration of a core definition', () => {
    const scope: GoTypeScope = { localDefs: { SetError: { type: 'object' } }, localDefsPrefix: 'EmailSetResponse' };

    expect(goType({ $ref: '#/$defs/SetError' }, true, scope)).toBe('SetError');
  });

  it('keeps PatchObject as the hand-written type even when declared locally', () => {
    const scope: GoTypeScope = { localDefs: { PatchObject: { type: 'object' } }, localDefsPrefix: 'EmailSetArgs' };

    expect(goType({ $ref: '#/$defs/PatchObject' }, true, scope)).toBe('PatchObject');
  });
});
