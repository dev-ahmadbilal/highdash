import { stubFalse } from '../../src/util/stubFalse';

describe('stubFalse', () => {
  it('should return false', () => {
    expect(stubFalse()).toBe(false);
  });

  it('should return false regardless of arguments', () => {
    expect(stubFalse(1, 2, 3)).toBe(false);
    expect(stubFalse('hello')).toBe(false);
    expect(stubFalse({ a: 1 })).toBe(false);
  });

  it('should return false with no arguments', () => {
    expect(stubFalse()).toBe(false);
  });

  it('should return false with null arguments', () => {
    expect(stubFalse(null)).toBe(false);
  });

  it('should return false with undefined arguments', () => {
    expect(stubFalse(undefined)).toBe(false);
  });

  it('should return false with boolean arguments', () => {
    expect(stubFalse(true)).toBe(false);
    expect(stubFalse(false)).toBe(false);
  });

  it('should return false with function arguments', () => {
    expect(stubFalse(() => {})).toBe(false);
  });

  it('should return false with object arguments', () => {
    expect(stubFalse({})).toBe(false);
    expect(stubFalse({ a: 1 })).toBe(false);
  });

  it('should return false with array arguments', () => {
    expect(stubFalse([])).toBe(false);
    expect(stubFalse([1, 2, 3])).toBe(false);
  });

  it('should return false with truthy arguments', () => {
    expect(stubFalse(1)).toBe(false);
    expect(stubFalse('hello')).toBe(false);
    expect(stubFalse({})).toBe(false);
  });
});
