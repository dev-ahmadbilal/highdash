import { clamp } from '../../src/number/clamp';

describe('clamp', () => {
  it('should clamp number within bounds', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(3, -5, 5)).toBe(3);
  });

  it('should handle reversed bounds', () => {
    expect(clamp(3, 5, -5)).toBe(3);
    expect(clamp(10, 5, -5)).toBe(5);
    expect(clamp(-10, 5, -5)).toBe(-5);
  });

  it('should handle equal bounds', () => {
    expect(clamp(5, 5, 5)).toBe(5);
    expect(clamp(3, 5, 5)).toBe(5);
  });

  it('should handle edge cases', () => {
    expect(clamp(0, 0, 0)).toBe(0);
    expect(clamp(1, 0, 0)).toBe(0);
    expect(clamp(-1, 0, 0)).toBe(0);
  });
});
