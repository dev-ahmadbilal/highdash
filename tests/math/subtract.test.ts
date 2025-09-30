import { subtract } from '../../src/math/subtract';

describe('subtract', () => {
  it('should subtract two positive numbers', () => {
    expect(subtract(6, 4)).toBe(2);
  });

  it('should subtract positive and negative numbers', () => {
    expect(subtract(6, -4)).toBe(10);
    expect(subtract(-6, 4)).toBe(-10);
  });

  it('should subtract two negative numbers', () => {
    expect(subtract(-6, -4)).toBe(-2);
  });

  it('should subtract zero', () => {
    expect(subtract(5, 0)).toBe(5);
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(0, 0)).toBe(0);
  });

  it('should subtract decimal numbers', () => {
    expect(subtract(3.5, 1.2)).toBeCloseTo(2.3);
  });

  it('should subtract very large numbers', () => {
    expect(subtract(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER - 1);
  });

  it('should handle Infinity', () => {
    expect(subtract(Infinity, 5)).toBe(Infinity);
    expect(subtract(-Infinity, 5)).toBe(-Infinity);
    expect(subtract(Infinity, Infinity)).toBeNaN();
  });

  it('should handle NaN', () => {
    expect(subtract(NaN, 5)).toBeNaN();
    expect(subtract(5, NaN)).toBeNaN();
    expect(subtract(NaN, NaN)).toBeNaN();
  });
});
