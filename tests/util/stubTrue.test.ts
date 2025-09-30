import { stubTrue } from '../../src/util/stubTrue';

describe('stubTrue', () => {
  it('should return true', () => {
    expect(stubTrue()).toBe(true);
  });

  it('should return true regardless of arguments', () => {
    expect(stubTrue(1, 2, 3)).toBe(true);
    expect(stubTrue('hello')).toBe(true);
    expect(stubTrue({ a: 1 })).toBe(true);
  });

  it('should return true with no arguments', () => {
    expect(stubTrue()).toBe(true);
  });

  it('should return true with null arguments', () => {
    expect(stubTrue(null)).toBe(true);
  });

  it('should return true with undefined arguments', () => {
    expect(stubTrue(undefined)).toBe(true);
  });

  it('should return true with boolean arguments', () => {
    expect(stubTrue(true)).toBe(true);
    expect(stubTrue(false)).toBe(true);
  });

  it('should return true with function arguments', () => {
    expect(stubTrue(() => {})).toBe(true);
  });

  it('should return true with object arguments', () => {
    expect(stubTrue({})).toBe(true);
    expect(stubTrue({ a: 1 })).toBe(true);
  });

  it('should return true with array arguments', () => {
    expect(stubTrue([])).toBe(true);
    expect(stubTrue([1, 2, 3])).toBe(true);
  });

  it('should return true with falsy arguments', () => {
    expect(stubTrue(0)).toBe(true);
    expect(stubTrue('')).toBe(true);
    expect(stubTrue(false)).toBe(true);
  });
});
