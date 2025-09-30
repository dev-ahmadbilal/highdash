import { camelCase } from '../../src/string/camelCase';

describe('camelCase', () => {
  it('should convert string to camel case', () => {
    expect(camelCase('--foo-bar--')).toBe('fooBar');
    expect(camelCase('fooBar')).toBe('fooBar');
    expect(camelCase('__FOO_BAR__')).toBe('fOOBAR');
  });

  it('should handle empty string', () => {
    expect(camelCase('')).toBe('');
  });

  it('should handle non-string input', () => {
    expect(camelCase(null as any)).toBe('');
    expect(camelCase(undefined as any)).toBe('');
    expect(camelCase(123 as any)).toBe('');
  });

  it('should handle single word', () => {
    expect(camelCase('hello')).toBe('hello');
  });

  it('should handle already camel case', () => {
    expect(camelCase('helloWorld')).toBe('helloWorld');
  });
});
