import { dropRight } from '../../src/array/dropRight';

describe('dropRight', () => {
  it('should drop last n elements', () => {
    expect(dropRight([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3]);
  });

  it('should return empty array when n is greater than array length', () => {
    expect(dropRight([1, 2, 3], 5)).toEqual([]);
  });

  it('should return original array when n is 0', () => {
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it('should return original array when n is negative', () => {
    expect(dropRight([1, 2, 3], -1)).toEqual([1, 2, 3]);
  });

  it('should default to 1 when n is not provided', () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2]);
  });

  it('should work with empty array', () => {
    expect(dropRight([], 2)).toEqual([]);
  });

  it('should work with strings', () => {
    expect(dropRight(['a', 'b', 'c', 'd'], 2)).toEqual(['a', 'b']);
  });

  it('should work with mixed types', () => {
    expect(dropRight([1, 'a', true, null], 2)).toEqual([1, 'a']);
  });

  it('should work with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    expect(dropRight([obj1, obj2, obj3], 1)).toEqual([obj1, obj2]);
  });

  it('should return new array (not modify original)', () => {
    const original = [1, 2, 3, 4, 5];
    const result = dropRight(original, 2);
    expect(result).not.toBe(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
