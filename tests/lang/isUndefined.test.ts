import { isUndefined } from '../../src/lang/isUndefined';

describe('isUndefined', () => {
  it('should return true for undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(void 0)).toBe(true);
  });

  it('should return false for non-undefined values', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
  });
});
