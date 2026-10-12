// Pins the type names derived from schema paths: both generators name their
// output types and files from these, so a change here renames every generated symbol.
import { SchemaNaming } from '../schema-naming';

describe('SchemaNaming', () => {
  const naming = new SchemaNaming();

  it('strips the directory and the .schema.json suffix from a schema path', () => {
    expect(naming.schemaBase('schemas/methods/Email.get.args.schema.json')).toBe('Email.get.args');
  });

  it('capitalizes every dot-separated part into a type name', () => {
    expect(naming.typeName('EmailSubmission.queryChanges.response')).toBe('EmailSubmissionQueryChangesResponse');
  });

  it('lower-case parts are capitalized too', () => {
    expect(naming.typeName('thread.get.args')).toBe('ThreadGetArgs');
  });
});
