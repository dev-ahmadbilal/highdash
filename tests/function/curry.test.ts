import { curry } from '../../src/function/curry';

describe('curry', () => {
  it('should curry function with multiple arguments', () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const curriedAdd = curry(add);

    expect(curriedAdd(1)(2)(3)).toBe(6);
    expect(curriedAdd(1, 2)(3)).toBe(6);
    expect(curriedAdd(1, 2, 3)).toBe(6);
  });

  it('should curry function with custom arity', () => {
    const add = (a: number, b: number, c: number = 0) => a + b + c;
    const curriedAdd = curry(add, 2);

    expect(curriedAdd(1)(2)).toBe(3); // Uses default value for c
    expect(curriedAdd(1, 2)).toBe(3);
  });

  it('should handle single argument function', () => {
    const identity = (x: number) => x;
    const curriedIdentity = curry(identity);

    expect(curriedIdentity(42)).toBe(42);
  });

  it('should handle zero argument function', () => {
    const constant = () => 42;
    const curriedConstant = curry(constant);

    expect(curriedConstant()).toBe(42);
  });
});
