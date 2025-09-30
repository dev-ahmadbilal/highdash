import { gt } from '../../src/lang/gt';

describe('gt', () => {
  it('should return true when first value is greater', () => {
    expect(gt(3, 1)).toBe(true);
    expect(gt(3.5, 3.2)).toBe(true);
    expect(gt(0, -1)).toBe(true);
  });

  it('should return false when values are equal', () => {
    expect(gt(3, 3)).toBe(false);
    expect(gt(0, 0)).toBe(false);
  });

  it('should return false when first value is less', () => {
    expect(gt(1, 3)).toBe(false);
    expect(gt(3.2, 3.5)).toBe(false);
    expect(gt(-1, 0)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(gt('3', '1')).toBe(false);
    expect(gt(3, '1')).toBe(false);
    expect(gt('3', 1)).toBe(false);
    expect(gt(null, 1)).toBe(false);
    expect(gt(1, null)).toBe(false);
  });
});
