// Pins the Go identifiers derived from JSON keys and method names; the Go SDK's
// consumers reference these exact field and method names.
import { GoNaming } from '../go-naming';

describe('GoNaming', () => {
  const naming = new GoNaming();

  it('lower-cases a schema base into a snake_case file name', () => {
    expect(naming.fileName('EmailSubmission.queryChanges.args')).toBe('emailsubmission_querychanges_args.go');
  });

  it('joins the capitalized parts of a JMAP method name', () => {
    expect(naming.methodName('Email/queryChanges')).toBe('EmailQueryChanges');
  });

  it('uses the listed initialism for a special JSON key', () => {
    expect(naming.fieldName('dsnBlobIds')).toBe('DSNBlobIDs');
    expect(naming.fieldName('@type')).toBe('AtType');
  });

  it('upper-cases a trailing Id and Ids of an unlisted key', () => {
    expect(naming.fieldName('parentId')).toBe('ParentID');
    expect(naming.fieldName('sourceIds')).toBe('SourceIDs');
  });

  it('only capitalizes a key without those suffixes', () => {
    expect(naming.fieldName('fetchHTMLBodyValues')).toBe('FetchHTMLBodyValues');
  });
});
