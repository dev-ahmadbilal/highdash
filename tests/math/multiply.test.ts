import { multiply } from '../../src/math/multiply';

describe('multiply', () => {
  it('should multiply two positive numbers', () => {
    expect(multiply(6, 4)).toBe(24);
  });

  it('should multiply positive and negative numbers', () => {
    expect(multiply(6, -4)).toBe(-24);
    expect(multiply(-6, 4)).toBe(-24);
  });

  it('should multiply two negative numbers', () => {
    expect(multiply(-6, -4)).toBe(24);
  });

  it('should multiply by zero', () => {
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, 5)).toBe(0);
  });

  it('should multiply by one', () => {
    expect(multiply(5, 1)).toBe(5);
    expect(multiply(1, 5)).toBe(5);
  });

  it('should multiply decimal numbers', () => {
    expect(multiply(1.5, 2.5)).toBeCloseTo(3.75);
  });

  it('should multiply very large numbers', () => {
    expect(multiply(1000000, 1000000)).toBe(1000000000000);
  });

  it('should handle Infinity', () => {
    expect(multiply(Infinity, 5)).toBe(Infinity);
    expect(multiply(-Infinity, 5)).toBe(-Infinity);
    expect(multiply(Infinity, 0)).toBeNaN();
  });

  it('should handle NaN', () => {
    expect(multiply(NaN, 5)).toBeNaN();
    expect(multiply(5, NaN)).toBeNaN();
    expect(multiply(NaN, NaN)).toBeNaN();
  });
});
