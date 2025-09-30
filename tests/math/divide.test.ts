import { divide } from '../../src/math/divide';

describe('divide', () => {
  it('should divide two positive numbers', () => {
    expect(divide(6, 4)).toBe(1.5);
  });

  it('should divide positive and negative numbers', () => {
    expect(divide(6, -2)).toBe(-3);
    expect(divide(-6, 2)).toBe(-3);
  });

  it('should divide two negative numbers', () => {
    expect(divide(-6, -2)).toBe(3);
  });

  it('should handle division by zero', () => {
    expect(divide(5, 0)).toBe(Infinity);
    expect(divide(-5, 0)).toBe(-Infinity);
    expect(divide(0, 0)).toBeNaN();
  });

  it('should divide by one', () => {
    expect(divide(5, 1)).toBe(5);
  });

  it('should divide zero by number', () => {
    expect(divide(0, 5)).toBe(0);
  });

  it('should divide decimal numbers', () => {
    expect(divide(1.5, 0.5)).toBe(3);
  });

  it('should handle Infinity', () => {
    expect(divide(Infinity, 5)).toBe(Infinity);
    expect(divide(-Infinity, 5)).toBe(-Infinity);
    expect(divide(Infinity, Infinity)).toBeNaN();
  });

  it('should handle NaN', () => {
    expect(divide(NaN, 5)).toBeNaN();
    expect(divide(5, NaN)).toBeNaN();
    expect(divide(NaN, NaN)).toBeNaN();
  });
});
