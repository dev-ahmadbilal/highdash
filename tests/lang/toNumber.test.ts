import { toNumber } from '../../src/lang/toNumber';

describe('toNumber', () => {
  it('should return numbers as-is', () => {
    expect(toNumber(3.2)).toBe(3.2);
    expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(-Infinity)).toBe(-Infinity);
  });

  it('should convert strings to numbers', () => {
    expect(toNumber('3.2')).toBe(3.2);
    expect(toNumber('0')).toBe(0);
    expect(toNumber('-3.2')).toBe(-3.2);
    expect(toNumber('abc')).toBe(0);
  });

  it('should convert booleans to numbers', () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  it('should return 0 for null/undefined', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBe(0);
  });

  it('should convert objects to numbers', () => {
    expect(toNumber({ valueOf: () => 42 })).toBe(42);
    expect(toNumber({ toString: () => '3.14' })).toBe(3.14);
    expect(toNumber({})).toBe(0);
  });

  it('should return 0 for invalid values', () => {
    expect(toNumber(() => {})).toBe(0);
    expect(toNumber(Symbol('test'))).toBe(0);
  });
});
