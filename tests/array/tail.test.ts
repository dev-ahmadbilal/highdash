import { tail } from '../../src/array/tail';

describe('tail', () => {
  it('should return all elements except the first', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
  });

  it('should return empty array for single element', () => {
    expect(tail([1])).toEqual([]);
  });

  it('should return empty array for empty array', () => {
    expect(tail([])).toEqual([]);
  });

  it('should work with strings', () => {
    expect(tail(['a', 'b', 'c'])).toEqual(['b', 'c']);
  });

  it('should work with mixed types', () => {
    expect(tail([1, 'a', true, null])).toEqual(['a', true, null]);
  });

  it('should work with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    expect(tail([obj1, obj2, obj3])).toEqual([obj2, obj3]);
  });

  it('should work with nested arrays', () => {
    expect(tail([[1], [2], [3]])).toEqual([[2], [3]]);
  });

  it('should handle null and undefined elements', () => {
    expect(tail([null, undefined, 1])).toEqual([undefined, 1]);
  });

  it('should return new array (not modify original)', () => {
    const original = [1, 2, 3];
    const result = tail(original);
    expect(result).not.toBe(original);
    expect(original).toEqual([1, 2, 3]);
  });
});
