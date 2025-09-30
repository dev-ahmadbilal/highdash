import { startCase } from '../../src/string/startCase';

describe('startCase', () => {
  it('should convert string to start case', () => {
    expect(startCase('--foo-bar--')).toBe('Foo Bar');
    expect(startCase('fooBar')).toBe('Foo Bar');
    expect(startCase('__FOO_BAR__')).toBe('Foo Bar');
  });

  it('should handle empty string', () => {
    expect(startCase('')).toBe('');
  });

  it('should handle non-string input', () => {
    expect(startCase(null as any)).toBe('');
    expect(startCase(undefined as any)).toBe('');
    expect(startCase(123 as any)).toBe('');
  });

  it('should handle single word', () => {
    expect(startCase('hello')).toBe('Hello');
  });

  it('should handle already start case', () => {
    expect(startCase('Hello World')).toBe('Hello World');
  });
});
