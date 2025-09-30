import { isNumber } from '../../src/lang/isNumber';

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(3)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
    expect(isNumber(Number('3'))).toBe(true);
  });

  it('should return false for non-numbers', () => {
    expect(isNumber('3')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(() => {})).toBe(false);
    expect(isNumber(NaN)).toBe(false);
  });
});
