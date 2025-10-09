import { isNative } from '../../src/lang/isNative';

describe('isNative', () => {
  it('should return true for native functions', () => {
    expect(isNative(Array.prototype.push)).toBe(true);
    expect(isNative(Object.prototype.toString)).toBe(true);
    expect(isNative(String.prototype.charAt)).toBe(true);
    expect(isNative(Number.prototype.toFixed)).toBe(true);
  });

  it('should return true for native constructors', () => {
    expect(isNative(Array)).toBe(true);
    expect(isNative(Object)).toBe(true);
    expect(isNative(String)).toBe(true);
    expect(isNative(Number)).toBe(true);
    expect(isNative(Date)).toBe(true);
    expect(isNative(RegExp)).toBe(true);
  });

  it('should return false for user-defined functions', () => {
    const userFunction = function () {};
    expect(isNative(userFunction)).toBe(false);
  });

  it('should return false for arrow functions', () => {
    const arrowFunction = () => {};
    expect(isNative(arrowFunction)).toBe(false);
  });

  it('should return false for bound functions', () => {
    const boundFunction = function () {}.bind({});
    expect(isNative(boundFunction)).toBe(false);
  });

  it('should return false for non-functions', () => {
    expect(isNative('string')).toBe(false);
    expect(isNative(123)).toBe(false);
    expect(isNative(true)).toBe(false);
    expect(isNative(null)).toBe(false);
    expect(isNative(undefined)).toBe(false);
    expect(isNative({})).toBe(false);
    expect(isNative([])).toBe(false);
  });

  it('should return false for class methods', () => {
    class TestClass {
      method() {}
    }
    const instance = new TestClass();
    expect(isNative(instance.method)).toBe(false);
  });

  it('should return false for async functions', () => {
    const asyncFunction = async function () {};
    expect(isNative(asyncFunction)).toBe(false);
  });

  it('should return false for generator functions', () => {
    function* generatorFunction() {
      yield 1;
    }
    expect(isNative(generatorFunction)).toBe(false);
  });
});
