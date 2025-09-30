import { snakeCase } from '../../src/string/snakeCase';

describe('snakeCase', () => {
  it('should convert string to snake case', () => {
    expect(snakeCase('--foo-bar--')).toBe('foo_bar');
    expect(snakeCase('fooBar')).toBe('foo_bar');
    expect(snakeCase('__FOO_BAR__')).toBe('foo_bar');
  });

  it('should handle empty string', () => {
    expect(snakeCase('')).toBe('');
  });

  it('should handle non-string input', () => {
    expect(snakeCase(null as any)).toBe('');
    expect(snakeCase(undefined as any)).toBe('');
    expect(snakeCase(123 as any)).toBe('');
  });

  it('should handle single word', () => {
    expect(snakeCase('hello')).toBe('hello');
  });

  it('should handle already snake case', () => {
    expect(snakeCase('hello_world')).toBe('hello_world');
  });
});
