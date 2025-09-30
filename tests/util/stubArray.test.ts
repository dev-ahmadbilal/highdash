import { stubArray } from '../../src/util/stubArray';

describe('stubArray', () => {
  it('should return empty array', () => {
    expect(stubArray()).toEqual([]);
  });

  it('should return new empty array each time', () => {
    const arr1 = stubArray();
    const arr2 = stubArray();
    expect(arr1).not.toBe(arr2);
    expect(arr1).toEqual(arr2);
  });

  it('should return empty array regardless of arguments', () => {
    expect(stubArray(1, 2, 3)).toEqual([]);
    expect(stubArray('hello')).toEqual([]);
    expect(stubArray({ a: 1 })).toEqual([]);
  });

  it('should return empty array with no arguments', () => {
    expect(stubArray()).toEqual([]);
  });

  it('should return empty array with null arguments', () => {
    expect(stubArray(null)).toEqual([]);
  });

  it('should return empty array with undefined arguments', () => {
    expect(stubArray(undefined)).toEqual([]);
  });

  it('should return empty array with boolean arguments', () => {
    expect(stubArray(true)).toEqual([]);
    expect(stubArray(false)).toEqual([]);
  });

  it('should return empty array with function arguments', () => {
    expect(stubArray(() => {})).toEqual([]);
  });

  it('should return empty array with object arguments', () => {
    expect(stubArray({})).toEqual([]);
    expect(stubArray({ a: 1 })).toEqual([]);
  });

  it('should return empty array with array arguments', () => {
    expect(stubArray([])).toEqual([]);
    expect(stubArray([1, 2, 3])).toEqual([]);
  });
});
