import { pMap } from '../../src/util/pMap.js';

describe('pMap', () => {
  it('should map array with concurrency limit', async () => {
    const input = [1, 2, 3, 4, 5];
    const mapper = jest.fn().mockImplementation(async (x: number) => x * 2);

    const result = await pMap(input, mapper, { concurrency: 2 });

    expect(result).toEqual([2, 4, 6, 8, 10]);
    expect(mapper).toHaveBeenCalledTimes(5);
  });

  it('should handle synchronous mapper', async () => {
    const input = [1, 2, 3];
    const mapper = jest.fn().mockReturnValue('sync');

    const result = await pMap(input, mapper);

    expect(result).toEqual(['sync', 'sync', 'sync']);
    expect(mapper).toHaveBeenCalledTimes(3);
  });

  it('should handle empty input', async () => {
    const input: number[] = [];
    const mapper = jest.fn().mockImplementation(async (x: number) => x * 2);

    const result = await pMap(input, mapper);

    expect(result).toEqual([]);
    expect(mapper).not.toHaveBeenCalled();
  });

  it('should handle infinite concurrency', async () => {
    const input = [1, 2, 3, 4, 5];
    const mapper = jest.fn().mockImplementation(async (x: number) => x * 2);

    const result = await pMap(input, mapper, { concurrency: Infinity });

    expect(result).toEqual([2, 4, 6, 8, 10]);
    expect(mapper).toHaveBeenCalledTimes(5);
  });

  it('should handle zero concurrency', async () => {
    const input = [1, 2, 3];
    const mapper = jest.fn().mockImplementation(async (x: number) => x * 2);

    const result = await pMap(input, mapper, { concurrency: 0 });

    expect(result).toEqual([2, 4, 6]);
    expect(mapper).toHaveBeenCalledTimes(3);
  });

  it('should handle negative concurrency', async () => {
    const input = [1, 2, 3];
    const mapper = jest.fn().mockImplementation(async (x: number) => x * 2);

    const result = await pMap(input, mapper, { concurrency: -1 });

    expect(result).toEqual([2, 4, 6]);
    expect(mapper).toHaveBeenCalledTimes(3);
  });

  it('should handle non-finite concurrency', async () => {
    const input = [1, 2, 3];
    const mapper = jest.fn().mockImplementation(async (x: number) => x * 2);

    const result = await pMap(input, mapper, { concurrency: NaN });

    expect(result).toEqual([2, 4, 6]);
    expect(mapper).toHaveBeenCalledTimes(3);
  });

  it('should pass correct index to mapper', async () => {
    const input = [1, 2, 3];
    const mapper = jest.fn().mockImplementation(async (x: number, index: number) => index);

    const result = await pMap(input, mapper);

    expect(result).toEqual([0, 1, 2]);
    expect(mapper).toHaveBeenCalledWith(1, 0);
    expect(mapper).toHaveBeenCalledWith(2, 1);
    expect(mapper).toHaveBeenCalledWith(3, 2);
  });
});
