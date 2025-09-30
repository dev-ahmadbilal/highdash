import { eq } from '../../src/lang/eq';

describe('eq', () => {
  it('should return true for same values', () => {
    expect(eq(1, 1)).toBe(true);
    expect(eq('a', 'a')).toBe(true);
    expect(eq(true, true)).toBe(true);
    expect(eq(null, null)).toBe(true);
    expect(eq(undefined, undefined)).toBe(true);
  });

  it('should return true for NaN values', () => {
    expect(eq(NaN, NaN)).toBe(true);
  });

  it('should return false for different values', () => {
    expect(eq(1, 2)).toBe(false);
    expect(eq('a', 'b')).toBe(false);
    expect(eq(true, false)).toBe(false);
    expect(eq(null, undefined)).toBe(false);
    expect(eq(1, '1')).toBe(false);
  });

  it('should return false for objects', () => {
    const obj = { a: 1 };
    expect(eq(obj, obj)).toBe(true);
    expect(eq(obj, { a: 1 })).toBe(false);
  });
});
