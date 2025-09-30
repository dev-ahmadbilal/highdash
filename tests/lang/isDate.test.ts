import { isDate } from '../../src/lang/isDate';

describe('isDate', () => {
  it('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('2023-01-01'))).toBe(true);
    expect(isDate(new Date(0))).toBe(true);
  });

  it('should return false for non-Date objects', () => {
    expect(isDate('Mon April 23 2012')).toBe(false);
    expect(isDate(1234567890)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(() => {})).toBe(false);
  });
});
