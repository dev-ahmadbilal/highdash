import { memoize } from '../../src/function/memoize';

describe('memoize', () => {
  it('should memoize function results', () => {
    const func = jest.fn((x) => x * 2);
    const memoized = memoize(func);

    const result1 = memoized(2);
    const result2 = memoized(2);
    const result3 = memoized(3);

    expect(func).toHaveBeenCalledTimes(2);
    expect(result1).toBe(4);
    expect(result2).toBe(4);
    expect(result3).toBe(6);
  });

  it('should use custom resolver', () => {
    const func = jest.fn((x) => x * 2);
    const resolver = jest.fn((x) => x.toString());
    const memoized = memoize(func, resolver);

    memoized(2);
    memoized(2);

    expect(resolver).toHaveBeenCalledWith(2);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should expose cache', () => {
    const func = jest.fn((x) => x * 2);
    const memoized = memoize(func);

    memoized(2);
    memoized(3);

    expect(memoized.cache.has(2)).toBe(true);
    expect(memoized.cache.has(3)).toBe(true);
    expect(memoized.cache.get(2)).toBe(4);
    expect(memoized.cache.get(3)).toBe(6);
  });
});
