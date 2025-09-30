import { isRegExp } from '../../src/lang/isRegExp';

describe('isRegExp', () => {
  it('should return true for RegExp objects', () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp('abc'))).toBe(true);
    expect(isRegExp(/abc/g)).toBe(true);
    expect(isRegExp(/abc/i)).toBe(true);
  });

  it('should return false for non-RegExp objects', () => {
    expect(isRegExp('/abc/')).toBe(false);
    expect(isRegExp('abc')).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp([])).toBe(false);
    expect(isRegExp(() => {})).toBe(false);
  });
});
