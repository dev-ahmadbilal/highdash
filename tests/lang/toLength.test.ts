import { toLength } from '../../src/lang/toLength';

describe('toLength', () => {
  it('should convert positive numbers to length', () => {
    expect(toLength(3.2)).toBe(3);
    expect(toLength(3)).toBe(3);
    expect(toLength(0)).toBe(0);
  });

  it('should convert negative numbers to 0', () => {
    expect(toLength(-3.2)).toBe(0);
    expect(toLength(-3)).toBe(0);
  });

  it('should convert Infinity to MAX_SAFE_INTEGER', () => {
    expect(toLength(Infinity)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toLength(-Infinity)).toBe(0);
  });

  it('should convert -0 to 0', () => {
    expect(toLength(-0)).toBe(0);
  });

  it('should convert string numbers to length', () => {
    expect(toLength('3.2')).toBe(3);
    expect(toLength('3')).toBe(3);
    expect(toLength('0')).toBe(0);
  });

  it('should convert negative string numbers to 0', () => {
    expect(toLength('-3.2')).toBe(0);
    expect(toLength('-3')).toBe(0);
  });

  it('should convert null to 0', () => {
    expect(toLength(null)).toBe(0);
  });

  it('should convert undefined to 0', () => {
    expect(toLength(undefined)).toBe(0);
  });

  it('should convert boolean to length', () => {
    expect(toLength(true)).toBe(1);
    expect(toLength(false)).toBe(0);
  });

  it('should convert empty string to 0', () => {
    expect(toLength('')).toBe(0);
  });

  it('should convert non-numeric strings to 0', () => {
    expect(toLength('hello')).toBe(0);
    expect(toLength('abc')).toBe(0);
  });

  it('should convert objects to 0', () => {
    expect(toLength({})).toBe(0);
    expect(toLength({ a: 1 })).toBe(0);
  });

  it('should convert arrays to 0', () => {
    expect(toLength([])).toBe(0);
    expect(toLength([1, 2, 3])).toBe(0);
  });

  it('should convert functions to 0', () => {
    expect(toLength(() => {})).toBe(0);
  });

  it('should convert dates to timestamp', () => {
    const date = new Date('2023-01-01');
    expect(toLength(date)).toBe(date.getTime());
  });

  it('should convert regex to 0', () => {
    expect(toLength(/abc/)).toBe(0);
  });

  it('should convert symbols to 0', () => {
    expect(toLength(Symbol('test'))).toBe(0);
  });

  it('should convert bigint to length', () => {
    expect(toLength(BigInt(123))).toBe(123);
    expect(toLength(BigInt(-123))).toBe(0);
  });

  it('should handle MAX_SAFE_INTEGER', () => {
    expect(toLength(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should handle numbers larger than MAX_SAFE_INTEGER', () => {
    expect(toLength(Number.MAX_SAFE_INTEGER + 1)).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should handle very small numbers', () => {
    expect(toLength(Number.MIN_VALUE)).toBe(0);
  });

  it('should handle NaN', () => {
    expect(toLength(NaN)).toBe(0);
  });

  it('should handle string with leading/trailing whitespace', () => {
    expect(toLength('  3.2  ')).toBe(3);
    expect(toLength('  -3.2  ')).toBe(0);
  });

  it('should handle scientific notation', () => {
    expect(toLength('1e2')).toBe(100);
    expect(toLength('1.5e2')).toBe(150);
    expect(toLength('-1e2')).toBe(0);
  });

  it('should truncate decimal places', () => {
    expect(toLength(3.9)).toBe(3);
    expect(toLength(-3.9)).toBe(0);
    expect(toLength(3.1)).toBe(3);
    expect(toLength(-3.1)).toBe(0);
  });

  it('should handle edge cases', () => {
    expect(toLength(0.1)).toBe(0);
    expect(toLength(-0.1)).toBe(0);
    expect(toLength(0.9)).toBe(0);
    expect(toLength(-0.9)).toBe(0);
  });

  it('should handle very large numbers', () => {
    expect(toLength(1e20)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toLength(-1e20)).toBe(0);
  });
});
