import { toArray } from '../../src/lang/toArray';

describe('toArray', () => {
  it('should convert objects to arrays', () => {
    expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
    expect(toArray({})).toEqual([]);
  });

  it('should convert strings to character arrays', () => {
    expect(toArray('abc')).toEqual(['a', 'b', 'c']);
    expect(toArray('')).toEqual([]);
  });

  it('should return arrays as-is', () => {
    const arr = [1, 2, 3];
    const result = toArray(arr);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(arr); // Should be a copy
  });

  it('should return empty array for null/undefined', () => {
    expect(toArray(null)).toEqual([]);
    expect(toArray(undefined)).toEqual([]);
  });

  it('should return empty array for primitives', () => {
    expect(toArray(1)).toEqual([]);
    expect(toArray(true)).toEqual([]);
    expect(toArray(() => {})).toEqual([]);
  });
});
