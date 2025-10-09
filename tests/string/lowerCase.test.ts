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

  it('should handle non-string input', () => {
    expect(lowerCase(null as any)).toBe('');
    expect(lowerCase(undefined as any)).toBe('');
    expect(lowerCase(123 as any)).toBe('');
    expect(lowerCase({} as any)).toBe('');
    expect(lowerCase([] as any)).toBe('');
  });

  it('should handle complex mixed case strings', () => {
    expect(lowerCase('__FOO_BAR__')).toBe('foo bar');
    expect(lowerCase('--Foo-Bar--')).toBe('foo bar');
    expect(lowerCase('fooBar123Baz')).toBe('foo bar baz');
    expect(lowerCase('123fooBar456')).toBe('foo bar');
  });

  it('should handle strings with only numbers', () => {
    expect(lowerCase('123')).toBe('');
    expect(lowerCase('123 456')).toBe('');
  });

  it('should handle strings with only special characters', () => {
    expect(lowerCase('!@#$%')).toBe('');
    expect(lowerCase('---')).toBe('');
  });

  it('should handle edge cases with numbers and letters', () => {
    expect(lowerCase('a1b2c3')).toBe('a b c');
    expect(lowerCase('1a2b3c')).toBe('a b c');
  });
});
