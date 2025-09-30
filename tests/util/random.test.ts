import { random } from '../../src/util/random';

describe('random', () => {
  it('should generate random number between 0 and upper bound', () => {
    const result = random(5);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(5);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should generate random number between lower and upper bound', () => {
    const result = random(1, 5);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(5);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should generate floating point number when floating is true', () => {
    const result = random(1, 5, true);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(5);
    expect(Number.isInteger(result)).toBe(false);
  });

  it('should generate floating point number when bounds are floats', () => {
    const result = random(1.2, 5.2);
    expect(result).toBeGreaterThanOrEqual(1.2);
    expect(result).toBeLessThanOrEqual(5.2);
    expect(Number.isInteger(result)).toBe(false);
  });

  it('should handle default parameters', () => {
    const result = random();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
    expect(Number.isInteger(result)).toBe(true);
  });
});
