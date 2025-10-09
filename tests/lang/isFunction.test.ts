import { isFunction } from '../../src/lang/isFunction';

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(Array.prototype.slice)).toBe(true);
    expect(isFunction(Number)).toBe(true);
    expect(isFunction(String)).toBe(true);
  });

  it('should return false for non-functions', () => {
    expect(isFunction('abc')).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
  });
});
