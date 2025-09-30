import { isArrayLike } from '../../src/lang/isArrayLike';

describe('isArrayLike', () => {
  it('should return true for array-like values', () => {
    expect(isArrayLike([1, 2, 3])).toBe(true);
    expect(isArrayLike('abc')).toBe(true);
    expect(isArrayLike({ length: 3 })).toBe(true);
    expect(isArrayLike({ length: 0 })).toBe(true);
  });

  it('should return false for non-array-like values', () => {
    expect(isArrayLike(null)).toBe(false);
    expect(isArrayLike(undefined)).toBe(false);
    expect(isArrayLike({})).toBe(false);
    expect(isArrayLike(() => {})).toBe(false);
    expect(isArrayLike({ length: -1 })).toBe(false);
    expect(isArrayLike({ length: 1.5 })).toBe(false);
    expect(isArrayLike({ length: '3' })).toBe(false);
  });
});
