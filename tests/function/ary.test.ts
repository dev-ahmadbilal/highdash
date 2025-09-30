import { ary } from '../../src/function/ary';

describe('ary', () => {
  it('should limit function arguments', () => {
    const func = (a: number, b: number, c: number) => [a, b, c];
    const limited = ary(func, 2);

    expect(limited(1, 2, 3)).toEqual([1, 2, undefined]);
  });

  it('should work with default arity', () => {
    const func = (a: number, b: number) => [a, b];
    const limited = ary(func);

    expect(limited(1, 2, 3)).toEqual([1, 2]);
  });

  it('should handle zero arity', () => {
    const func = (a: number, b: number) => [a, b];
    const limited = ary(func, 0);

    expect(limited(1, 2, 3)).toEqual([undefined, undefined]);
  });
});
