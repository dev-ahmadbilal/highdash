import { stubString } from '../../src/util/stubString';

describe('stubString', () => {
  it('should return empty string', () => {
    expect(stubString()).toBe('');
  });

  it('should return empty string regardless of arguments', () => {
    expect(stubString(1, 2, 3)).toBe('');
    expect(stubString('hello')).toBe('');
    expect(stubString({ a: 1 })).toBe('');
  });

  it('should return empty string with no arguments', () => {
    expect(stubString()).toBe('');
  });

  it('should return empty string with null arguments', () => {
    expect(stubString(null)).toBe('');
  });

  it('should return empty string with undefined arguments', () => {
    expect(stubString(undefined)).toBe('');
  });

  it('should return empty string with boolean arguments', () => {
    expect(stubString(true)).toBe('');
    expect(stubString(false)).toBe('');
  });

  it('should return empty string with function arguments', () => {
    expect(stubString(() => {})).toBe('');
  });

  it('should return empty string with object arguments', () => {
    expect(stubString({})).toBe('');
    expect(stubString({ a: 1 })).toBe('');
  });

  it('should return empty string with array arguments', () => {
    expect(stubString([])).toBe('');
    expect(stubString([1, 2, 3])).toBe('');
  });

  it('should return empty string with string arguments', () => {
    expect(stubString('hello')).toBe('');
    expect(stubString('world')).toBe('');
  });

  it('should return empty string with number arguments', () => {
    expect(stubString(123)).toBe('');
    expect(stubString(0)).toBe('');
  });
});
