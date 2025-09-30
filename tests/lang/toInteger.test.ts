import { toInteger } from '../../src/lang/toInteger';

describe('toInteger', () => {
  it('should convert string numbers to integers', () => {
    expect(toInteger('3.2')).toBe(3);
    expect(toInteger('3')).toBe(3);
    expect(toInteger('0')).toBe(0);
  });

  it('should convert negative string numbers to integers', () => {
    expect(toInteger('-3.2')).toBe(-3);
    expect(toInteger('-3')).toBe(-3);
  });

  it('should convert Infinity to MAX_VALUE', () => {
    expect(toInteger(Infinity)).toBe(Number.MAX_VALUE);
    expect(toInteger(-Infinity)).toBe(-Number.MAX_VALUE);
  });

  it('should convert -0 to 0', () => {
    expect(toInteger(-0)).toBe(0);
  });

  it('should convert numbers to integers', () => {
    expect(toInteger(3.2)).toBe(3);
    expect(toInteger(3)).toBe(3);
    expect(toInteger(0)).toBe(0);
    expect(toInteger(-3.2)).toBe(-3);
    expect(toInteger(-3)).toBe(-3);
  });

  it('should convert null to 0', () => {
    expect(toInteger(null)).toBe(0);
  });

  it('should convert undefined to 0', () => {
    expect(toInteger(undefined)).toBe(0);
  });

  it('should convert boolean to integers', () => {
    expect(toInteger(true)).toBe(1);
    expect(toInteger(false)).toBe(0);
  });

  it('should convert empty string to 0', () => {
    expect(toInteger('')).toBe(0);
  });

  it('should convert non-numeric strings to 0', () => {
    expect(toInteger('hello')).toBe(0);
    expect(toInteger('abc')).toBe(0);
  });

  it('should convert objects to 0', () => {
    expect(toInteger({})).toBe(0);
    expect(toInteger({ a: 1 })).toBe(0);
  });

  it('should convert arrays to 0', () => {
    expect(toInteger([])).toBe(0);
    expect(toInteger([1, 2, 3])).toBe(0);
  });

  it('should convert functions to 0', () => {
    expect(toInteger(() => {})).toBe(0);
  });

  it('should convert dates to timestamp', () => {
    const date = new Date('2023-01-01');
    expect(toInteger(date)).toBe(date.getTime());
  });

  it('should convert regex to 0', () => {
    expect(toInteger(/abc/)).toBe(0);
  });

  it('should convert symbols to 0', () => {
    expect(toInteger(Symbol('test'))).toBe(0);
  });

  it('should convert bigint to integers', () => {
    expect(toInteger(BigInt(123))).toBe(123);
    expect(toInteger(BigInt(-123))).toBe(-123);
  });

  it('should handle very large numbers', () => {
    expect(toInteger(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toInteger(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('should handle very small numbers', () => {
    expect(toInteger(Number.MIN_VALUE)).toBe(0);
  });

  it('should handle NaN', () => {
    expect(toInteger(NaN)).toBe(0);
  });

  it('should handle string with leading/trailing whitespace', () => {
    expect(toInteger('  3.2  ')).toBe(3);
    expect(toInteger('  -3.2  ')).toBe(-3);
  });

  it('should handle scientific notation', () => {
    expect(toInteger('1e2')).toBe(100);
    expect(toInteger('1.5e2')).toBe(150);
    expect(toInteger('-1e2')).toBe(-100);
  });

  it('should truncate decimal places', () => {
    expect(toInteger(3.9)).toBe(3);
    expect(toInteger(-3.9)).toBe(-3);
    expect(toInteger(3.1)).toBe(3);
    expect(toInteger(-3.1)).toBe(-3);
  });

  it('should handle edge cases', () => {
    expect(toInteger(0.1)).toBe(0);
    expect(toInteger(-0.1)).toBe(0);
    expect(toInteger(0.9)).toBe(0);
    expect(toInteger(-0.9)).toBe(0);
  });
});
