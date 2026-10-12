// Pins how the hand-written runtime templates become generated files: the
// header, the package rename, and the package comment of doc.go.
import { RuntimeTemplateEmitter } from '../runtime-template-emitter';
import { GoTemplates } from '../templates';

describe('RuntimeTemplateEmitter', () => {
  const emitter = new RuntimeTemplateEmitter(new GoTemplates('otherpkg'));

  it('prefixes the generated-code header and renames the package clause', () => {
    expect(emitter.emit('client.go', 'package jmapsdk\n\nfunc F() {}\n')).toBe(
      '// Code generated from mailbox-idl/jmap. DO NOT EDIT.\n\npackage otherpkg\n\nfunc F() {}\n',
    );
  });

  it('renames only the first package clause', () => {
    expect(emitter.emit('client.go', 'package jmapsdk\n\n// package jmapsdk is described\npackage x\n')).toContain('package otherpkg\n\n// package jmapsdk is described\npackage x');
  });

  it('renames the package comment of doc.go as well', () => {
    expect(emitter.emit('doc.go', '// Package jmapsdk provides a client.\npackage jmapsdk\n')).toContain(
      '// Package otherpkg provides a client.\npackage otherpkg\n',
    );
  });

  it('leaves the package comment of other files alone', () => {
    expect(emitter.emit('shared.go', '// Package jmapsdk provides a client.\npackage jmapsdk\n')).toContain(
      '// Package jmapsdk provides a client.\npackage otherpkg\n',
    );
  });
});
