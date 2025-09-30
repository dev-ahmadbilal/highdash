import { mean } from '../../src/math/mean';

describe('mean', () => {
  it('should calculate mean of positive numbers', () => {
    expect(mean([4, 2, 8, 6])).toBe(5);
  });

  it('should calculate mean of negative numbers', () => {
    expect(mean([-2, -4, -6])).toBe(-4);
  });

  it('should calculate mean of mixed positive and negative numbers', () => {
    expect(mean([-2, 4, -6, 8])).toBe(1);
  });

  it('should handle single number', () => {
    expect(mean([5])).toBe(5);
  });

  it('should handle empty array', () => {
    expect(mean([])).toBeNaN();
  });

  it('should handle array with zeros', () => {
    expect(mean([0, 0, 0])).toBe(0);
  });

  it('should handle decimal numbers', () => {
    expect(mean([1.5, 2.5, 3.5])).toBeCloseTo(2.5);
  });

  it('should handle array with duplicate numbers', () => {
    expect(mean([2, 2, 2, 2])).toBe(2);
  });

  it('should handle large numbers', () => {
    expect(mean([1000000, 2000000, 3000000])).toBe(2000000);
  });

  it('should handle non-array input', () => {
    expect(mean(null as any)).toBeNaN();
    expect(mean(undefined as any)).toBeNaN();
  });

  it('should handle array with NaN', () => {
    expect(mean([1, 2, NaN, 4])).toBeNaN();
  });

  it('should handle array with Infinity', () => {
    expect(mean([1, 2, Infinity, 4])).toBe(Infinity);
  });
});
