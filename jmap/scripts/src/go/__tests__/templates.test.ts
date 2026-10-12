// Pins the text fragments whose exact form the generated Go depends on:
// comment trimming (gofmt strips trailing space from comments) and tag layout.
import { GoTemplates } from '../templates';

describe('GoTemplates', () => {
  const templates = new GoTemplates('jmapsdk');

  it('trims trailing whitespace from a type doc comment', () => {
    expect(templates.typeDocComment('Foo', 'does things  ')).toBe('// Foo does things');
  });

  it('has no doc comment or field comment for an empty description', () => {
    expect(templates.typeDocComment('Foo', '')).toBeUndefined();
    expect(templates.fieldComment('')).toBeUndefined();
  });

  it('trims trailing whitespace from a field comment', () => {
    expect(templates.fieldComment('The id. ')).toBe('// The id.');
  });

  it('adds omitempty to the tag of an optional field only', () => {
    expect(templates.jsonTag('state', true)).toBe('`json:"state"`');
    expect(templates.jsonTag('state', false)).toBe('`json:"state,omitempty"`');
  });
});
