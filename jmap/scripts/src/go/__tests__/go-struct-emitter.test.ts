// Pins the struct declarations the Go SDK is built from: required versus
// omitempty tags, the result-reference field type, and the allOf embedding.
import type { JsonSchemaNode } from '../../schema/json-schema';
import { GoNaming } from '../go-naming';
import { GoStructEmitter } from '../go-struct-emitter';
import { GoStructFormatter } from '../go-struct-formatter';
import { GoTypeMapper } from '../go-type-mapper';
import { GoTemplates } from '../templates';

describe('GoStructEmitter', () => {
  const mapper = new GoTypeMapper({});
  const emitter = new GoStructEmitter(mapper, new GoNaming(), new GoStructFormatter(), new GoTemplates('jmapsdk'));
  const none = new Set<string>();

  it('writes the description as the doc comment and tags optional fields with omitempty', () => {
    const schema: JsonSchemaNode = {
      description: 'Email/get args',
      required: ['accountId'],
      properties: {
        accountId: { type: 'string', description: 'The account.' },
        properties: { type: 'array', items: { type: 'string' } },
      },
    };

    expect(emitter.emitStruct('EmailGetArgs', schema, none, mapper.globalScope)).toBe(
      [
        '// EmailGetArgs Email/get args',
        'type EmailGetArgs struct {',
        '\tAccountID string `json:"accountId"` // The account.',
        '\tProperties []string `json:"properties,omitempty"`',
        '}',
      ].join('\n'),
    );
  });

  it('falls back to the title when there is no description and omits the comment without either', () => {
    expect(emitter.emitStruct('T', { title: 'A title' }, none, mapper.globalScope)).toBe('// T A title\ntype T struct {\n}');
    expect(emitter.emitStruct('T', {}, none, mapper.globalScope)).toBe('type T struct {\n}');
  });

  it('types a result-reference argument as StringOrRef with the reference comment', () => {
    const schema: JsonSchemaNode = { properties: { ids: { type: 'array', items: { type: 'string' }, description: 'ignored' } } };

    expect(emitter.emitStruct('A', schema, new Set(['ids']), mapper.globalScope)).toBe(
      'type A struct {\n\tIDs StringOrRef `json:"ids,omitempty"` // StringIDs(...) for a literal list, Ref(handle, path) for a result reference.\n}',
    );
  });

  it('embeds the base definition of an allOf schema next to the extra properties map', () => {
    const schema: JsonSchemaNode = { allOf: [{ $ref: '#/$defs/Mailbox' }] };

    expect(emitter.emitAllOfStruct('MailboxExt', schema)).toBe(
      [
        '// MailboxExt extends Mailbox with vendor-prefixed properties.',
        'type MailboxExt struct {',
        '\tMailbox',
        '\t// captures sib: vendor-prefixed properties',
        '\tExtraProperties map[string]json.RawMessage `json:"-"`',
        '}',
      ].join('\n'),
    );
  });

  it.each([
    ['no allOf', {}],
    ['an empty allOf', { allOf: [] }],
    ['a base without a ref', { allOf: [{ type: 'object' }] }],
    ['a string-only base', { allOf: [{ $ref: '#/$defs/EmailId' }] }],
    ['a hand-written base', { allOf: [{ $ref: '#/$defs/PatchObject' }] }],
  ] satisfies [string, JsonSchemaNode][])('renders no allOf struct for %s', (_name, schema) => {
    expect(emitter.emitAllOfStruct('X', schema)).toBeNull();
  });
});
