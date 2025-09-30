import { isString } from '../../src/lang/isString';

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('abc')).toBe(true);
    expect(isString('')).toBe(true);
    expect(isString('123')).toBe(true);
    expect(isString(String('abc'))).toBe(true);
  });

  it('should return false for non-strings', () => {
    expect(isString(1)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(() => {})).toBe(false);
  });
});
