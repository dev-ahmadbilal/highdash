import { isNull } from '../../src/lang/isNull';

describe('isNull', () => {
  it('should return true for null', () => {
    expect(isNull(null)).toBe(true);
  });

  it('should return false for non-null values', () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull(() => {})).toBe(false);
  });
});
