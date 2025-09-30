import { isArray } from '../../src/lang/isArray';

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray([])).toBe(true);
    expect(isArray(new Array(3))).toBe(true);
  });

  it('should return false for non-arrays', () => {
    expect(isArray('abc')).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(() => {})).toBe(false);
    // Note: document.body.children would be NodeList, which is array-like but not an array
    // expect(isArray(document.body.children)).toBe(false);
  });
});
