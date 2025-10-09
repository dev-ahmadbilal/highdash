import { isObject } from '../../src/lang/isObject';

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(new Object())).toBe(true);
  });

  it('should return true for arrays', () => {
    expect(isObject([])).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
  });

  it('should return true for functions', () => {
    expect(isObject(function () {})).toBe(true);
    expect(isObject(() => {})).toBe(true);
  });

  it('should return true for regex', () => {
    expect(isObject(/abc/)).toBe(true);
    expect(isObject(new RegExp('abc'))).toBe(true);
  });

  it('should return true for dates', () => {
    expect(isObject(new Date())).toBe(true);
  });

  it('should return false for primitives', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(true)).toBe(false);
  });
});
