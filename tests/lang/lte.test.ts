import { lte } from '../../src/lang/lte';

describe('lte', () => {
  it('should return true when first value is less or equal', () => {
    expect(lte(1, 3)).toBe(true);
    expect(lte(3, 3)).toBe(true);
    expect(lte(3.2, 3.5)).toBe(true);
    expect(lte(-1, 0)).toBe(true);
  });

  it('should return false when first value is greater', () => {
    expect(lte(3, 1)).toBe(false);
    expect(lte(3.5, 3.2)).toBe(false);
    expect(lte(0, -1)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(lte('1', '3')).toBe(false);
    expect(lte(1, '3')).toBe(false);
    expect(lte('1', 3)).toBe(false);
    expect(lte(null, 1)).toBe(false);
    expect(lte(1, null)).toBe(false);
  });
});
