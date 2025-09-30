import { upperCase } from '../../src/string/upperCase';

describe('upperCase', () => {
  it('should convert string to upper case with spaces', () => {
    expect(upperCase('--foo-bar--')).toBe('FOO BAR');
  });

  it('should convert camelCase to upper case with spaces', () => {
    expect(upperCase('fooBar')).toBe('FOO BAR');
  });

  it('should convert PascalCase to upper case with spaces', () => {
    expect(upperCase('FooBar')).toBe('FOO BAR');
  });

  it('should convert kebab-case to upper case with spaces', () => {
    expect(upperCase('foo-bar')).toBe('FOO BAR');
  });

  it('should convert snake_case to upper case with spaces', () => {
    expect(upperCase('foo_bar')).toBe('FOO BAR');
  });

  it('should convert mixed case strings', () => {
    expect(upperCase('foo bar')).toBe('FOO BAR');
    expect(upperCase('fooBAR')).toBe('FOO BAR');
    expect(upperCase('FOObar')).toBe('FOOBAR');
  });

  it('should handle single words', () => {
    expect(upperCase('foo')).toBe('FOO');
    expect(upperCase('FOO')).toBe('FOO');
  });

  it('should handle empty string', () => {
    expect(upperCase('')).toBe('');
  });

  it('should handle strings with numbers', () => {
    expect(upperCase('foo123Bar')).toBe('FOO BAR');
    expect(upperCase('123foo')).toBe('FOO');
  });

  it('should handle strings with special characters', () => {
    expect(upperCase('foo@bar')).toBe('FOO BAR');
    expect(upperCase('foo.bar')).toBe('FOO BAR');
  });

  it('should handle already upper case strings', () => {
    expect(upperCase('HELLO WORLD')).toBe('HELLO WORLD');
  });

  it('should handle strings with multiple spaces', () => {
    expect(upperCase('foo  bar')).toBe('FOO BAR');
  });
});
