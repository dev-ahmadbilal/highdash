import { capitalize } from '../../src/string/capitalize';

describe('capitalize', () => {
  it('should capitalize the first character and lowercase the rest', () => {
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('fred')).toBe('Fred');
    expect(capitalize('Fred')).toBe('Fred');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle single character', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  it('should handle non-string input', () => {
    expect(capitalize(null as any)).toBe('');
    expect(capitalize(undefined as any)).toBe('');
  });

  it('should handle strings with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });
});
