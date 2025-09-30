import { times } from '../../src/util/times';

describe('times', () => {
  it('should invoke function n times', () => {
    const iteratee = jest.fn((i) => i * 2);
    const result = times(3, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(3);
    expect(iteratee).toHaveBeenNthCalledWith(1, 0);
    expect(iteratee).toHaveBeenNthCalledWith(2, 1);
    expect(iteratee).toHaveBeenNthCalledWith(3, 2);
    expect(result).toEqual([0, 2, 4]);
  });

  it('should handle zero times', () => {
    const iteratee = jest.fn();
    const result = times(0, iteratee);

    expect(iteratee).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should handle negative times', () => {
    const iteratee = jest.fn();
    const result = times(-1, iteratee);

    expect(iteratee).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should handle non-integer times', () => {
    const iteratee = jest.fn();
    const result = times(2.5, iteratee);

    expect(iteratee).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should handle large numbers', () => {
    const iteratee = jest.fn((i) => i);
    const result = times(5, iteratee);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });
});
