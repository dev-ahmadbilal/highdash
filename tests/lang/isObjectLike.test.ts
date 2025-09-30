import { isObjectLike } from '../../src/lang/isObjectLike';

describe('isObjectLike', () => {
  it('should return true for objects', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike({ a: 1 })).toBe(true);
  });

  it('should return true for arrays', () => {
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike([1, 2, 3])).toBe(true);
  });

  it('should return true for functions', () => {
    expect(isObjectLike(() => {})).toBe(true);
    expect(isObjectLike(function() {})).toBe(true);
  });

  it('should return true for dates', () => {
    expect(isObjectLike(new Date())).toBe(true);
  });

  it('should return true for regex', () => {
    expect(isObjectLike(/abc/)).toBe(true);
    expect(isObjectLike(new RegExp('abc'))).toBe(true);
  });

  it('should return true for error objects', () => {
    expect(isObjectLike(new Error())).toBe(true);
    expect(isObjectLike(new TypeError())).toBe(true);
  });

  it('should return true for Map', () => {
    expect(isObjectLike(new Map())).toBe(true);
  });

  it('should return true for Set', () => {
    expect(isObjectLike(new Set())).toBe(true);
  });

  it('should return true for WeakMap', () => {
    expect(isObjectLike(new WeakMap())).toBe(true);
  });

  it('should return true for WeakSet', () => {
    expect(isObjectLike(new WeakSet())).toBe(true);
  });

  it('should return false for null', () => {
    expect(isObjectLike(null)).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isObjectLike('string')).toBe(false);
    expect(isObjectLike(123)).toBe(false);
    expect(isObjectLike(true)).toBe(false);
    expect(isObjectLike(false)).toBe(false);
    expect(isObjectLike(undefined)).toBe(false);
  });

  it('should return false for symbols', () => {
    expect(isObjectLike(Symbol('test'))).toBe(false);
  });

  it('should return false for bigint', () => {
    expect(isObjectLike(BigInt(123))).toBe(false);
  });
});
