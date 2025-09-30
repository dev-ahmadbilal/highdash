import { kebabCase } from '../../src/string/kebabCase';

describe('kebabCase', () => {
  it('should convert string to kebab case', () => {
    expect(kebabCase('--foo-bar--')).toBe('foo-bar');
    expect(kebabCase('fooBar')).toBe('foo-bar');
    expect(kebabCase('__FOO_BAR__')).toBe('foo-bar');
  });

  it('should handle empty string', () => {
    expect(kebabCase('')).toBe('');
  });

  it('should handle non-string input', () => {
    expect(kebabCase(null as any)).toBe('');
    expect(kebabCase(undefined as any)).toBe('');
    expect(kebabCase(123 as any)).toBe('');
  });

  it('should handle single word', () => {
    expect(kebabCase('hello')).toBe('hello');
  });

  it('should handle already kebab case', () => {
    expect(kebabCase('hello-world')).toBe('hello-world');
  });
});
