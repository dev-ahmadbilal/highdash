import { drop } from '../../src/array/drop';

describe('drop', () => {
  it('should drop first n elements', () => {
    expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
  });

  it('should return empty array when n is greater than array length', () => {
    expect(drop([1, 2, 3], 5)).toEqual([]);
  });

  it('should return original array when n is 0', () => {
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it('should return original array when n is negative', () => {
    expect(drop([1, 2, 3], -1)).toEqual([1, 2, 3]);
  });

  it('should default to 1 when n is not provided', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
  });

  it('should work with empty array', () => {
    expect(drop([], 2)).toEqual([]);
  });

  it('should work with strings', () => {
    expect(drop(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
  });

  it('should work with mixed types', () => {
    expect(drop([1, 'a', true, null], 2)).toEqual([true, null]);
  });

  it('should work with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    expect(drop([obj1, obj2, obj3], 1)).toEqual([obj2, obj3]);
  });

  it('should return new array (not modify original)', () => {
    const original = [1, 2, 3, 4, 5];
    const result = drop(original, 2);
    expect(result).not.toBe(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
