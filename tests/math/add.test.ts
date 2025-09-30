import { add } from '../../src/math/add';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(6, 4)).toBe(10);
  });

  it('should add positive and negative numbers', () => {
    expect(add(5, -3)).toBe(2);
  });

  it('should add two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it('should add zero', () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });

  it('should add decimal numbers', () => {
    expect(add(1.5, 2.3)).toBeCloseTo(3.8);
  });

  it('should add very large numbers', () => {
    expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  });

  it('should handle Infinity', () => {
    expect(add(Infinity, 5)).toBe(Infinity);
    expect(add(-Infinity, 5)).toBe(-Infinity);
    expect(add(Infinity, -Infinity)).toBeNaN();
  });

  it('should handle NaN', () => {
    expect(add(NaN, 5)).toBeNaN();
    expect(add(5, NaN)).toBeNaN();
    expect(add(NaN, NaN)).toBeNaN();
  });
});
