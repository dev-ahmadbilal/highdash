import { isEmpty } from '../../src/lang/isEmpty';

describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for booleans and numbers', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty(0)).toBe(true);
  });

  it('should return true for empty strings and arrays', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
  });

  it('should return false for non-empty strings and arrays', () => {
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return false for non-empty objects', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('should return true for empty maps and sets', () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false for non-empty maps and sets', () => {
    expect(isEmpty(new Map([['a', 1]]))).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
  });
});
