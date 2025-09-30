import { isNil } from '../../src/lang/isNil';

describe('isNil', () => {
  it('should return true for null and undefined', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false for other falsy values', () => {
    expect(isNil(false)).toBe(false);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(NaN)).toBe(false);
  });

  it('should return false for truthy values', () => {
    expect(isNil(true)).toBe(false);
    expect(isNil(1)).toBe(false);
    expect(isNil('hello')).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil([])).toBe(false);
  });
});
