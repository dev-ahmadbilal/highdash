import { gte } from '../../src/lang/gte';

describe('gte', () => {
  it('should return true when first value is greater or equal', () => {
    expect(gte(3, 1)).toBe(true);
    expect(gte(3, 3)).toBe(true);
    expect(gte(3.5, 3.2)).toBe(true);
    expect(gte(0, -1)).toBe(true);
  });

  it('should return false when first value is less', () => {
    expect(gte(1, 3)).toBe(false);
    expect(gte(3.2, 3.5)).toBe(false);
    expect(gte(-1, 0)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(gte('3', '1')).toBe(false);
    expect(gte(3, '1')).toBe(false);
    expect(gte('3', 1)).toBe(false);
    expect(gte(null, 1)).toBe(false);
    expect(gte(1, null)).toBe(false);
  });
});
