// Pins the field line shape the generator hands to gofmt: single spaces between
// name, type, tag and comment, and no trailing comment when the field has none.
// gofmt only aligns a line it can parse, so a drifting shape breaks formatting.
import { GoStructFormatter, type GoStructField } from '../go-struct-formatter';

const field = (name: string, type: string, tag: string, comment?: string): GoStructField => ({ name, type, tag, comment });

describe('GoStructFormatter', () => {
  const formatter = new GoStructFormatter();

  it('joins name, type, tag and comment with single spaces', () => {
    const lines = formatter.format([
      field('ID', 'string', '`json:"id"`', '// The id.'),
      field('AccountID', '*string', '`json:"accountId,omitempty"`', '// The account.'),
    ]);

    expect(lines).toEqual(['\tID string `json:"id"` // The id.', '\tAccountID *string `json:"accountId,omitempty"` // The account.']);
  });

  it('omits the comment for a field without one', () => {
    expect(formatter.format([field('Type', 'string', '`json:"type"`')])).toEqual(['\tType string `json:"type"`']);
  });

  it('returns no lines for a struct without fields', () => {
    expect(formatter.format([])).toEqual([]);
  });
});
