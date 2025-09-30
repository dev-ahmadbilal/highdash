import { upperFirst } from '../../src/string/upperFirst';

describe('upperFirst', () => {
  it('should capitalize the first character only', () => {
    expect(upperFirst('fred')).toBe('Fred');
    expect(upperFirst('FRED')).toBe('FRED');
    expect(upperFirst('fred barney')).toBe('Fred barney');
  });

  it('should handle empty string', () => {
    expect(upperFirst('')).toBe('');
  });

  it('should handle single character', () => {
    expect(upperFirst('a')).toBe('A');
    expect(upperFirst('A')).toBe('A');
  });

  it('should handle non-string input', () => {
    expect(upperFirst(null as any)).toBe('');
    expect(upperFirst(undefined as any)).toBe('');
  });
});
