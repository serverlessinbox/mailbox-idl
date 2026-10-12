// Pins the per-method Go files: local helper definitions become structs prefixed
// with the method type, and anything that already exists in core_types.go or
// shared.go must not be redeclared there.
import type { JsonSchemaNode } from '../../schema/json-schema';
import { GoNaming } from '../go-naming';
import { GoStructEmitter } from '../go-struct-emitter';
import { GoStructFormatter } from '../go-struct-formatter';
import { GoTypeMapper } from '../go-type-mapper';
import { MethodFileEmitter } from '../method-file-emitter';
import { GoTemplates } from '../templates';

describe('MethodFileEmitter', () => {
  const mapper = new GoTypeMapper({});
  const templates = new GoTemplates('jmapsdk');
  const emitter = new MethodFileEmitter(mapper, new GoStructEmitter(mapper, new GoNaming(), new GoStructFormatter(), templates), templates);
  const none = new Set<string>();

  it('writes only the struct of a schema without local definitions', () => {
    const schema: JsonSchemaNode = { description: 'Foo/get args', required: ['accountId'], properties: { accountId: { type: 'string' } } };

    expect(emitter.emit(schema, 'FooGetArgs', none)).toBe(
      '// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.\n\npackage jmapsdk\n\n' +
        '// FooGetArgs Foo/get args\ntype FooGetArgs struct {\n\tAccountID string `json:"accountId"`\n}\n',
    );
  });

  it('declares a local object definition ahead of the method struct, prefixed with its type name', () => {
    const schema: JsonSchemaNode = {
      $defs: { Patch: { type: 'object', required: ['op'], properties: { op: { type: 'string' } } } },
      properties: { patch: { $ref: '#/$defs/Patch' } },
    };

    const source = emitter.emit(schema, 'FooSetArgs', none);

    expect(source).toContain('type FooSetArgsPatch struct {\n\tOp string `json:"op"`\n}\n\n');
    expect(source).toContain('\tPatch FooSetArgsPatch `json:"patch,omitempty"`');
  });

  it.each(['CreationId', 'PatchObject', 'SetError'])('does not redeclare the local definition %s', (defName) => {
    const schema: JsonSchemaNode = { $defs: { [defName]: { type: 'object', properties: { a: { type: 'string' } } } } };

    expect(emitter.emit(schema, 'FooSetArgs', none)).not.toContain(`type FooSetArgs${defName}`);
  });

  it('imports encoding/json when a local definition uses allOf', () => {
    const schema: JsonSchemaNode = { $defs: { Ext: { allOf: [{ $ref: '#/$defs/Mailbox' }] } } };

    const source = emitter.emit(schema, 'FooArgs', none);

    expect(source).toContain('package jmapsdk\n\nimport "encoding/json"\n\n');
    expect(source).toContain('type FooArgsExt struct {\n\tMailbox\n');
  });

  it('types the arguments named in refFields as StringOrRef', () => {
    const schema: JsonSchemaNode = { properties: { ids: { type: 'array', items: { type: 'string' } } } };

    expect(emitter.emit(schema, 'FooGetArgs', new Set(['ids']))).toContain('\tIDs StringOrRef `json:"ids,omitempty"`');
  });
});
