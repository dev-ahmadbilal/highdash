import { sum } from '../../src/math/sum';

describe('sum', () => {
  it('should sum array values', () => {
    expect(sum([4, 2, 8, 6])).toBe(20);
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });

  it('should handle empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('should handle non-array input', () => {
    expect(sum(null as any)).toBe(0);
    expect(sum(undefined as any)).toBe(0);
  });

  it('should handle non-numeric values', () => {
    expect(sum([1, '2', 3, 'invalid'])).toBe(6);
    expect(sum(['a', 'b', 'c'])).toBe(0);
  });

  it('should handle negative numbers', () => {
    expect(sum([1, -2, 3, -4])).toBe(-2);
  });
});
