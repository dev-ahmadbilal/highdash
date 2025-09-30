import { toFinite } from '../../src/lang/toFinite';

describe('toFinite', () => {
  it('should convert string numbers to finite numbers', () => {
    expect(toFinite('3.2')).toBe(3.2);
    expect(toFinite('3')).toBe(3);
    expect(toFinite('0')).toBe(0);
  });

  it('should convert negative string numbers to finite numbers', () => {
    expect(toFinite('-3.2')).toBe(-3.2);
    expect(toFinite('-3')).toBe(-3);
  });

  it('should convert Infinity to MAX_VALUE', () => {
    expect(toFinite(Infinity)).toBe(Number.MAX_VALUE);
    expect(toFinite(-Infinity)).toBe(-Number.MAX_VALUE);
  });

  it('should convert -0 to 0', () => {
    expect(toFinite(-0)).toBe(0);
  });

  it('should convert numbers to finite numbers', () => {
    expect(toFinite(3.2)).toBe(3.2);
    expect(toFinite(3)).toBe(3);
    expect(toFinite(0)).toBe(0);
    expect(toFinite(-3.2)).toBe(-3.2);
    expect(toFinite(-3)).toBe(-3);
  });

  it('should convert null to 0', () => {
    expect(toFinite(null)).toBe(0);
  });

  it('should convert undefined to 0', () => {
    expect(toFinite(undefined)).toBe(0);
  });

  it('should convert boolean to numbers', () => {
    expect(toFinite(true)).toBe(1);
    expect(toFinite(false)).toBe(0);
  });

  it('should convert empty string to 0', () => {
    expect(toFinite('')).toBe(0);
  });

  it('should convert non-numeric strings to 0', () => {
    expect(toFinite('hello')).toBe(0);
    expect(toFinite('abc')).toBe(0);
  });

  it('should convert objects to 0', () => {
    expect(toFinite({})).toBe(0);
    expect(toFinite({ a: 1 })).toBe(0);
  });

  it('should convert arrays to 0', () => {
    expect(toFinite([])).toBe(0);
    expect(toFinite([1, 2, 3])).toBe(0);
  });

  it('should convert functions to 0', () => {
    expect(toFinite(() => {})).toBe(0);
  });

  it('should convert dates to timestamp', () => {
    const date = new Date('2023-01-01');
    expect(toFinite(date)).toBe(date.getTime());
  });

  it('should convert regex to 0', () => {
    expect(toFinite(/abc/)).toBe(0);
  });

  it('should convert symbols to 0', () => {
    expect(toFinite(Symbol('test'))).toBe(0);
  });

  it('should convert bigint to numbers', () => {
    expect(toFinite(BigInt(123))).toBe(123);
    expect(toFinite(BigInt(-123))).toBe(-123);
  });

  it('should handle very large numbers', () => {
    expect(toFinite(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toFinite(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('should handle very small numbers', () => {
    expect(toFinite(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });

  it('should handle NaN', () => {
    expect(toFinite(NaN)).toBe(0);
  });

  it('should handle string with leading/trailing whitespace', () => {
    expect(toFinite('  3.2  ')).toBe(3.2);
    expect(toFinite('  -3.2  ')).toBe(-3.2);
  });

  it('should handle scientific notation', () => {
    expect(toFinite('1e2')).toBe(100);
    expect(toFinite('1.5e2')).toBe(150);
    expect(toFinite('-1e2')).toBe(-100);
  });
});
