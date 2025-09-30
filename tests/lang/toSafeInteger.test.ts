import { toSafeInteger } from '../../src/lang/toSafeInteger';

describe('toSafeInteger', () => {
  it('should convert string numbers to safe integers', () => {
    expect(toSafeInteger('3.2')).toBe(3);
    expect(toSafeInteger('3')).toBe(3);
    expect(toSafeInteger('0')).toBe(0);
  });

  it('should convert negative string numbers to safe integers', () => {
    expect(toSafeInteger('-3.2')).toBe(-3);
    expect(toSafeInteger('-3')).toBe(-3);
  });

  it('should convert Infinity to MAX_SAFE_INTEGER', () => {
    expect(toSafeInteger(Infinity)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toSafeInteger(-Infinity)).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('should convert -0 to 0', () => {
    expect(toSafeInteger(-0)).toBe(0);
  });

  it('should convert numbers to safe integers', () => {
    expect(toSafeInteger(3.2)).toBe(3);
    expect(toSafeInteger(3)).toBe(3);
    expect(toSafeInteger(0)).toBe(0);
    expect(toSafeInteger(-3.2)).toBe(-3);
    expect(toSafeInteger(-3)).toBe(-3);
  });

  it('should convert null to 0', () => {
    expect(toSafeInteger(null)).toBe(0);
  });

  it('should convert undefined to 0', () => {
    expect(toSafeInteger(undefined)).toBe(0);
  });

  it('should convert boolean to safe integers', () => {
    expect(toSafeInteger(true)).toBe(1);
    expect(toSafeInteger(false)).toBe(0);
  });

  it('should convert empty string to 0', () => {
    expect(toSafeInteger('')).toBe(0);
  });

  it('should convert non-numeric strings to 0', () => {
    expect(toSafeInteger('hello')).toBe(0);
    expect(toSafeInteger('abc')).toBe(0);
  });

  it('should convert objects to 0', () => {
    expect(toSafeInteger({})).toBe(0);
    expect(toSafeInteger({ a: 1 })).toBe(0);
  });

  it('should convert arrays to 0', () => {
    expect(toSafeInteger([])).toBe(0);
    expect(toSafeInteger([1, 2, 3])).toBe(0);
  });

  it('should convert functions to 0', () => {
    expect(toSafeInteger(() => {})).toBe(0);
  });

  it('should convert dates to timestamp', () => {
    const date = new Date('2023-01-01');
    expect(toSafeInteger(date)).toBe(date.getTime());
  });

  it('should convert regex to 0', () => {
    expect(toSafeInteger(/abc/)).toBe(0);
  });

  it('should convert symbols to 0', () => {
    expect(toSafeInteger(Symbol('test'))).toBe(0);
  });

  it('should convert bigint to safe integers', () => {
    expect(toSafeInteger(BigInt(123))).toBe(123);
    expect(toSafeInteger(BigInt(-123))).toBe(-123);
  });

  it('should handle MAX_SAFE_INTEGER', () => {
    expect(toSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should handle MIN_SAFE_INTEGER', () => {
    expect(toSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('should handle numbers larger than MAX_SAFE_INTEGER', () => {
    expect(toSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should handle numbers smaller than MIN_SAFE_INTEGER', () => {
    expect(toSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('should handle very small numbers', () => {
    expect(toSafeInteger(Number.MIN_VALUE)).toBe(0);
  });

  it('should handle NaN', () => {
    expect(toSafeInteger(NaN)).toBe(0);
  });

  it('should handle string with leading/trailing whitespace', () => {
    expect(toSafeInteger('  3.2  ')).toBe(3);
    expect(toSafeInteger('  -3.2  ')).toBe(-3);
  });

  it('should handle scientific notation', () => {
    expect(toSafeInteger('1e2')).toBe(100);
    expect(toSafeInteger('1.5e2')).toBe(150);
    expect(toSafeInteger('-1e2')).toBe(-100);
  });

  it('should truncate decimal places', () => {
    expect(toSafeInteger(3.9)).toBe(3);
    expect(toSafeInteger(-3.9)).toBe(-3);
    expect(toSafeInteger(3.1)).toBe(3);
    expect(toSafeInteger(-3.1)).toBe(-3);
  });

  it('should handle edge cases', () => {
    expect(toSafeInteger(0.1)).toBe(0);
    expect(toSafeInteger(-0.1)).toBe(0);
    expect(toSafeInteger(0.9)).toBe(0);
    expect(toSafeInteger(-0.9)).toBe(0);
  });

  it('should handle very large numbers', () => {
    expect(toSafeInteger(1e20)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toSafeInteger(-1e20)).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('should handle numbers just within safe range', () => {
    expect(toSafeInteger(Number.MAX_SAFE_INTEGER - 1)).toBe(Number.MAX_SAFE_INTEGER - 1);
    expect(toSafeInteger(Number.MIN_SAFE_INTEGER + 1)).toBe(Number.MIN_SAFE_INTEGER + 1);
  });
});
