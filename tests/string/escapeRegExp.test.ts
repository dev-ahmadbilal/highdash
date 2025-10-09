import { escapeRegExp } from '../../src/string/escapeRegExp';

describe('escapeRegExp', () => {
  it('should escape regex special characters', () => {
    expect(escapeRegExp('[lodash](https://lodash.com/)')).toBe('\\[lodash\\]\\(https://lodash\\.com/\\)');
  });

  it('should escape backslash', () => {
    expect(escapeRegExp('\\')).toBe('\\\\');
  });

  it('should escape caret', () => {
    expect(escapeRegExp('^')).toBe('\\^');
  });

  it('should escape dollar sign', () => {
    expect(escapeRegExp('$')).toBe('\\$');
  });

  it('should escape period', () => {
    expect(escapeRegExp('.')).toBe('\\.');
  });

  it('should escape asterisk', () => {
    expect(escapeRegExp('*')).toBe('\\*');
  });

  it('should escape plus sign', () => {
    expect(escapeRegExp('+')).toBe('\\+');
  });

  it('should escape question mark', () => {
    expect(escapeRegExp('?')).toBe('\\?');
  });

  it('should escape parentheses', () => {
    expect(escapeRegExp('()')).toBe('\\(\\)');
  });

  it('should escape square brackets', () => {
    expect(escapeRegExp('[]')).toBe('\\[\\]');
  });

  it('should escape curly braces', () => {
    expect(escapeRegExp('{}')).toBe('\\{\\}');
  });

  it('should escape pipe', () => {
    expect(escapeRegExp('|')).toBe('\\|');
  });

  it('should escape multiple special characters', () => {
    expect(escapeRegExp('\\^$.*+?()[]{}|')).toBe('\\\\\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|');
  });

  it('should handle empty string', () => {
    expect(escapeRegExp('')).toBe('');
  });

  it('should handle string without special characters', () => {
    expect(escapeRegExp('hello world')).toBe('hello world');
  });

  it('should handle string with numbers', () => {
    expect(escapeRegExp('hello123')).toBe('hello123');
  });

  it('should handle string with spaces', () => {
    expect(escapeRegExp('hello world')).toBe('hello world');
  });

  it('should handle string with punctuation', () => {
    expect(escapeRegExp('hello, world!')).toBe('hello, world!');
  });

  it('should handle string with mixed content', () => {
    expect(escapeRegExp('hello [world] (test) {value} | other')).toBe(
      'hello \\[world\\] \\(test\\) \\{value\\} \\| other',
    );
  });

  it('should handle string with multiple lines', () => {
    expect(escapeRegExp('hello\nworld')).toBe('hello\nworld');
  });

  it('should handle string with tabs', () => {
    expect(escapeRegExp('hello\tworld')).toBe('hello\tworld');
  });

  it('should handle string with carriage returns', () => {
    expect(escapeRegExp('hello\rworld')).toBe('hello\rworld');
  });

  it('should handle string with form feeds', () => {
    expect(escapeRegExp('hello\fworld')).toBe('hello\fworld');
  });

  it('should handle string with vertical tabs', () => {
    expect(escapeRegExp('hello\vworld')).toBe('hello\vworld');
  });

  it('should handle string with backspaces', () => {
    expect(escapeRegExp('hello\bworld')).toBe('hello\bworld');
  });

  it('should handle string with null characters', () => {
    expect(escapeRegExp('hello\0world')).toBe('hello\0world');
  });

  it('should handle string with unicode characters', () => {
    expect(escapeRegExp('hello🚀world')).toBe('hello🚀world');
  });

  it('should handle string with emoji', () => {
    expect(escapeRegExp('hello😀world')).toBe('hello😀world');
  });

  it('should handle string with special characters and regex entities', () => {
    expect(escapeRegExp('hello [world] (test) {value} | other')).toBe(
      'hello \\[world\\] \\(test\\) \\{value\\} \\| other',
    );
  });

  it('should handle string with numbers and regex entities', () => {
    expect(escapeRegExp('123 [456] (789) {value} | other')).toBe('123 \\[456\\] \\(789\\) \\{value\\} \\| other');
  });

  it('should handle string with mixed separators and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other',
    );
  });

  it('should handle string with mixed separators, spaces, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n\r')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n\r',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n\r\f')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n\r\f',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n\r\f\v')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n\r\f\v',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n\r\f\v\b')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n\r\f\v\b',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n\r\f\v\b\0')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n\r\f\v\b\0',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n\r\f\v\b\0🚀')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n\r\f\v\b\0🚀',
    );
  });

  it('should handle string with mixed separators, spaces, tabs, newlines, carriage returns, form feeds, vertical tabs, backspaces, null characters, unicode, emoji, and regex entities', () => {
    expect(escapeRegExp('hello, [world]; (test): {value} | other\t\n\r\f\v\b\0🚀😀')).toBe(
      'hello, \\[world\\]; \\(test\\): \\{value\\} \\| other\t\n\r\f\v\b\0🚀😀',
    );
  });
});
