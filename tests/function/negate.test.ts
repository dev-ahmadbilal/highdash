import { negate } from '../../src/function/negate';

describe('negate', () => {
  it('should negate the result of the predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    const isOdd = negate(isEven);

    expect(isOdd(3)).toBe(true);
    expect(isOdd(4)).toBe(false);
  });

  it('should pass arguments to the original function', () => {
    const mockFn = jest.fn().mockReturnValue(true);
    const negatedFn = negate(mockFn);

    negatedFn('arg1', 'arg2');
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should work with functions that return false', () => {
    const alwaysFalse = () => false;
    const alwaysTrue = negate(alwaysFalse);

    expect(alwaysTrue()).toBe(true);
  });
});
