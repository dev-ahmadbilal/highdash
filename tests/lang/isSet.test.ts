import { isSet } from '../../src/lang/isSet';

describe('isSet', () => {
  it('should return true for Set objects', () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new Set([1, 2, 3]))).toBe(true);
  });

  it('should return false for non-Set objects', () => {
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet({})).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet('abc')).toBe(false);
    expect(isSet(1)).toBe(false);
    expect(isSet(true)).toBe(false);
    expect(isSet(null)).toBe(false);
    expect(isSet(undefined)).toBe(false);
    expect(isSet(() => {})).toBe(false);
  });
});
