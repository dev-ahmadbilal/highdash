import { toString } from '../../src/lang/toString';

describe('toString', () => {
  it('should return empty string for null/undefined', () => {
    expect(toString(null)).toBe('');
    expect(toString(undefined)).toBe('');
  });

  it('should preserve -0 sign', () => {
    expect(toString(-0)).toBe('-0');
    expect(toString(0)).toBe('0');
  });

  it('should convert arrays to strings', () => {
    expect(toString([1, 2, 3])).toBe('1,2,3');
    expect(toString([])).toBe('');
  });

  it('should convert numbers to strings', () => {
    expect(toString(3.14)).toBe('3.14');
    expect(toString(0)).toBe('0');
    expect(toString(-0)).toBe('-0');
  });

  it('should convert booleans to strings', () => {
    expect(toString(true)).toBe('true');
    expect(toString(false)).toBe('false');
  });

  it('should return strings as-is', () => {
    expect(toString('abc')).toBe('abc');
    expect(toString('')).toBe('');
  });

  it('should convert objects to strings', () => {
    expect(toString({})).toBe('[object Object]');
    expect(toString({ toString: () => 'custom' })).toBe('custom');
  });

  it('should convert functions to strings', () => {
    expect(toString(() => {})).toBe('() => { }');
  });
});
