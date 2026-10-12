// Pins index.ts: it exports only the primary type per schema so helper types of
// different schemas cannot collide, then re-exports the composed modules.
import { SchemaNaming } from '../../schema/schema-naming';
import { IndexEmitter } from '../index-emitter';
import { TsTemplates } from '../templates';

describe('IndexEmitter', () => {
  const emitter = new IndexEmitter(new TsTemplates(), new SchemaNaming());

  it('exports the primary type of each schema followed by the composed modules', () => {
    expect(emitter.emit(['Email.get.args', 'Email.get.response'])).toBe(
      [
        "export type { EmailGetArgs } from './Email.get.args';",
        "export type { EmailGetResponse } from './Email.get.response';",
        "export * from './client';",
        "export * from './session';",
        "export * from './refs';",
        "export * from './methods';",
        "export * from './batch';",
        '',
      ].join('\n'),
    );
  });
});
