import { isArguments } from '../../src/lang/isArguments';

/* eslint-disable prefer-rest-params */
describe('isArguments', () => {
  it('should return true for arguments object', () => {
    function testFunction() {
      return isArguments(arguments);
    }
    expect(testFunction(1, 2, 3)).toBe(true);
  });

  it('should return false for array', () => {
    expect(isArguments([1, 2, 3])).toBe(false);
  });

  it('should return false for object', () => {
    expect(isArguments({ a: 1 })).toBe(false);
  });

  it('should return false for string', () => {
    expect(isArguments('hello')).toBe(false);
  });

  it('should return false for number', () => {
    expect(isArguments(123)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isArguments(true)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isArguments(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isArguments(undefined)).toBe(false);
  });

  it('should return false for function', () => {
    expect(isArguments(() => {})).toBe(false);
  });

  it('should return false for empty arguments', () => {
    function testFunction() {
      return isArguments(arguments);
    }
    expect(testFunction()).toBe(true);
  });
});
