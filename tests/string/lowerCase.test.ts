import { lowerCase } from '../../src/string/lowerCase';

describe('lowerCase', () => {
  it('should convert string to lower case with spaces', () => {
    expect(lowerCase('--foo-bar--')).toBe('foo bar');
  });

  it('should convert camelCase to lower case with spaces', () => {
    expect(lowerCase('fooBar')).toBe('foo bar');
  });

  it('should convert PascalCase to lower case with spaces', () => {
    expect(lowerCase('FooBar')).toBe('foo bar');
  });

  it('should convert kebab-case to lower case with spaces', () => {
    expect(lowerCase('foo-bar')).toBe('foo bar');
  });

  it('should convert snake_case to lower case with spaces', () => {
    expect(lowerCase('foo_bar')).toBe('foo bar');
  });

  it('should convert mixed case strings', () => {
    expect(lowerCase('FOO BAR')).toBe('foo bar');
    expect(lowerCase('fooBAR')).toBe('foo bar');
    expect(lowerCase('FOObar')).toBe('foobar');
  });

  it('should handle single words', () => {
    expect(lowerCase('FOO')).toBe('foo');
    expect(lowerCase('foo')).toBe('foo');
  });

  it('should handle empty string', () => {
    expect(lowerCase('')).toBe('');
  });

  it('should handle strings with numbers', () => {
    expect(lowerCase('foo123Bar')).toBe('foo bar');
    expect(lowerCase('123foo')).toBe('foo');
  });

  it('should handle strings with special characters', () => {
    expect(lowerCase('foo@bar')).toBe('foo bar');
    expect(lowerCase('foo.bar')).toBe('foo bar');
  });

  it('should handle already lower case strings', () => {
    expect(lowerCase('hello world')).toBe('hello world');
  });

  it('should handle strings with multiple spaces', () => {
    expect(lowerCase('foo  bar')).toBe('foo bar');
  });
});
