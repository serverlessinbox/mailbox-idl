// Pins the identifiers derived from JMAP method names; webmail-ui imports the
// generated wrapper functions by these names.
import { TsNaming } from '../ts-naming';

describe('TsNaming', () => {
  const naming = new TsNaming();

  it('joins the capitalized parts of a method name into the wrapper function name', () => {
    expect(naming.wrapperFunctionName('EmailSubmission/queryChanges')).toBe('EmailSubmissionQueryChanges');
  });

  it('wraps the same name into the validator import alias', () => {
    expect(naming.validatorAlias('Email/get')).toBe('validateEmailGetResponse');
  });
});
