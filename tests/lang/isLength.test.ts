import { isLength } from '../../src/lang/isLength';

describe('isLength', () => {
  it('should return true for valid array lengths', () => {
    expect(isLength(0)).toBe(true);
    expect(isLength(1)).toBe(true);
    expect(isLength(100)).toBe(true);
    expect(isLength(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it('should return false for negative numbers', () => {
    expect(isLength(-1)).toBe(false);
    expect(isLength(-100)).toBe(false);
  });

  it('should return false for non-integers', () => {
    expect(isLength(1.5)).toBe(false);
    expect(isLength(3.14)).toBe(false);
  });

  it('should return false for Infinity', () => {
    expect(isLength(Infinity)).toBe(false);
    expect(isLength(-Infinity)).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(isLength(NaN)).toBe(false);
  });

  it('should return false for numbers larger than MAX_SAFE_INTEGER', () => {
    expect(isLength(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(isLength('5')).toBe(false);
    expect(isLength('hello')).toBe(false);
    expect(isLength(true)).toBe(false);
    expect(isLength(false)).toBe(false);
    expect(isLength(null)).toBe(false);
    expect(isLength(undefined)).toBe(false);
    expect(isLength({})).toBe(false);
    expect(isLength([])).toBe(false);
    expect(isLength(() => {})).toBe(false);
  });

  it('should return true for zero', () => {
    expect(isLength(0)).toBe(true);
  });

  it('should return true for MAX_SAFE_INTEGER', () => {
    expect(isLength(Number.MAX_SAFE_INTEGER)).toBe(true);
  });
});
