import { isPlainObject } from '../../src/lang/isPlainObject';

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('should return false for arrays', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isPlainObject(function () {})).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
  });

  it('should return false for dates', () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  it('should return false for regex', () => {
    expect(isPlainObject(/abc/)).toBe(false);
  });

  it('should return false for class instances', () => {
    class Foo {}
    expect(isPlainObject(new Foo())).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
  });

  it('should return false for Map and Set', () => {
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
  });

  it('should return false for typed arrays', () => {
    expect(isPlainObject(new Uint8Array())).toBe(false);
    expect(isPlainObject(new Int32Array())).toBe(false);
  });
});
