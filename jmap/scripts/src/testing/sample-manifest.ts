import type { Manifest } from '../schema/manifest';

/**
 * A three-method manifest for emitter tests: Email/query provides `/ids` twice,
 * Email/get accepts it as `#ids`, and Thread/get declares no result references.
 */
export const sampleManifest: Manifest = {
  version: 1,
  capabilities: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:mail'],
  methods: [
    {
      name: 'Email/query',
      capability: 'urn:ietf:params:jmap:mail',
      argsSchema: 'schemas/methods/Email.query.args.schema.json',
      responseSchema: 'schemas/methods/Email.query.response.schema.json',
      dx: { resultRefs: { provides: [{ responsePath: '/ids' }, { responsePath: '/ids' }] } },
    },
    {
      name: 'Email/get',
      capability: 'urn:ietf:params:jmap:mail',
      argsSchema: 'schemas/methods/Email.get.args.schema.json',
      responseSchema: 'schemas/methods/Email.get.response.schema.json',
      dx: {
        resultRefs: {
          accepts: [
            { argKey: '#ids', targetArgPath: '/ids', source: { method: 'Email/query', responsePath: '/ids' } },
          ],
        },
      },
    },
    {
      name: 'Thread/get',
      capability: 'urn:ietf:params:jmap:mail',
      argsSchema: 'schemas/methods/Thread.get.args.schema.json',
      responseSchema: 'schemas/methods/Thread.get.response.schema.json',
    },
  ],
};
