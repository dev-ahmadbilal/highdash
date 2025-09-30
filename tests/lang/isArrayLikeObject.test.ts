import { isArrayLikeObject } from '../../src/lang/isArrayLikeObject';

describe('isArrayLikeObject', () => {
  it('should return true for array-like objects', () => {
    expect(isArrayLikeObject([1, 2, 3])).toBe(true);
    expect(isArrayLikeObject({ length: 3 })).toBe(true);
    expect(isArrayLikeObject({ length: 0 })).toBe(true);
  });

  it('should return false for non-array-like objects', () => {
    expect(isArrayLikeObject('abc')).toBe(false);
    expect(isArrayLikeObject(null)).toBe(false);
    expect(isArrayLikeObject(undefined)).toBe(false);
    expect(isArrayLikeObject({})).toBe(false);
    expect(isArrayLikeObject(() => {})).toBe(false);
    expect(isArrayLikeObject({ length: -1 })).toBe(false);
    expect(isArrayLikeObject({ length: 1.5 })).toBe(false);
    expect(isArrayLikeObject({ length: '3' })).toBe(false);
  });
});
