// Pins core_types.go assembly: definition order, the Keywords alias, the
// encoding/json import that allOf structs force, and the reporting of listed
// definitions the core schema no longer defines.
import type { JsonSchemaDefinitions } from '../../schema/json-schema';
import { CoreTypesEmitter } from '../core-types-emitter';
import { GoNaming } from '../go-naming';
import { GoStructEmitter } from '../go-struct-emitter';
import { GoStructFormatter } from '../go-struct-formatter';
import { GoTypeMapper } from '../go-type-mapper';
import { GoTemplates } from '../templates';

function emitterFor(coreDefs: JsonSchemaDefinitions): CoreTypesEmitter {
  const mapper = new GoTypeMapper(coreDefs);
  const templates = new GoTemplates('jmapsdk');
  return new CoreTypesEmitter(coreDefs, mapper, new GoStructEmitter(mapper, new GoNaming(), new GoStructFormatter(), templates), templates);
}

describe('CoreTypesEmitter', () => {
  const coreDefs: JsonSchemaDefinitions = {
    Email: { description: 'An email', type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
    Thread: { description: 'A thread', type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
    Keywords: { type: 'object' },
  };

  it('starts with the generated header and the package clause', () => {
    const { source } = emitterFor(coreDefs).emit();

    expect(source.startsWith('// Code generated from mailbox-idl/jmap JSON Schema. DO NOT EDIT.\n\npackage jmapsdk\n\n')).toBe(true);
  });

  it('emits Thread ahead of Email and Keywords as an alias', () => {
    const { source } = emitterFor(coreDefs).emit();

    expect(source.indexOf('type Thread struct')).toBeLessThan(source.indexOf('type Email struct'));
    expect(source).toContain('type Keywords = map[string]bool\n');
  });

  it('reports every listed definition the core schema lacks', () => {
    const { missingDefs } = emitterFor(coreDefs).emit();

    expect(missingDefs).toContain('Mailbox');
    expect(missingDefs).not.toContain('Email');
    expect(missingDefs).not.toContain('Thread');
  });

  it('imports encoding/json only when a definition uses allOf', () => {
    const withAllOf: JsonSchemaDefinitions = { ...coreDefs, Mailbox: { allOf: [{ $ref: '#/$defs/Email' }] } };

    expect(emitterFor(coreDefs).emit().source).not.toContain('import "encoding/json"');
    const { source } = emitterFor(withAllOf).emit();
    expect(source).toContain('package jmapsdk\n\nimport "encoding/json"\n\n');
    expect(source).toContain('type Mailbox struct {\n\tEmail\n');
  });

  it('does not emit the hand-written PatchObject definition', () => {
    const { source } = emitterFor({ ...coreDefs, PatchObject: { type: 'object' } }).emit();

    expect(source).not.toContain('PatchObject');
  });
});
