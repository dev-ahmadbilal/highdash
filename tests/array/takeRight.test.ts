import { takeRight } from '../../src/array/takeRight';

describe('takeRight', () => {
  it('should take last n elements', () => {
    expect(takeRight([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
  });

  it('should take all elements when n is greater than array length', () => {
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it('should return empty array when n is 0', () => {
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
  });

  it('should return empty array when n is negative', () => {
    expect(takeRight([1, 2, 3], -1)).toEqual([]);
  });

  it('should default to 1 when n is not provided', () => {
    expect(takeRight([1, 2, 3])).toEqual([3]);
  });

  it('should work with empty array', () => {
    expect(takeRight([], 2)).toEqual([]);
  });

  it('should work with strings', () => {
    expect(takeRight(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
  });

  it('should work with mixed types', () => {
    expect(takeRight([1, 'a', true, null], 2)).toEqual([true, null]);
  });

  it('should work with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    expect(takeRight([obj1, obj2, obj3], 2)).toEqual([obj2, obj3]);
  });

  it('should return new array (not modify original)', () => {
    const original = [1, 2, 3, 4, 5];
    const result = takeRight(original, 3);
    expect(result).not.toBe(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
