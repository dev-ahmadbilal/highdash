import { over } from '../../src/util/over';

describe('over', () => {
  it('should create function that invokes iteratees and returns results', () => {
    const func = over([Math.max, Math.min]);
    expect(func(1, 2, 3, 4)).toEqual([4, 1]);
  });

  it('should work with single iteratee', () => {
    const func = over([(x: number) => x * 2]);
    expect(func(5)).toEqual([10]);
  });

  it('should work with multiple iteratees', () => {
    const func = over([(x: number) => x * 2, (x: number) => x + 1, (x: number) => x - 1]);
    expect(func(5)).toEqual([10, 6, 4]);
  });

  it('should work with different argument counts', () => {
    const func = over([(a: number, b: number) => a + b, (a: number, b: number) => a * b]);
    expect(func(2, 3)).toEqual([5, 6]);
  });

  it('should work with string functions', () => {
    const func = over([
      (str: string) => str.toUpperCase(),
      (str: string) => str.toLowerCase(),
      (str: string) => str.length,
    ]);
    expect(func('Hello')).toEqual(['HELLO', 'hello', 5]);
  });

  it('should work with array functions', () => {
    const func = over([
      (arr: number[]) => arr.length,
      (arr: number[]) => arr.reduce((sum, n) => sum + n, 0),
      (arr: number[]) => Math.max(...arr),
    ]);
    expect(func([1, 2, 3, 4])).toEqual([4, 10, 4]);
  });

  it('should work with object functions', () => {
    const func = over([
      (obj: any) => Object.keys(obj).length,
      (obj: any) => Object.values(obj).reduce((sum: number, val: any) => sum + val, 0),
    ]);
    expect(func({ a: 1, b: 2, c: 3 })).toEqual([3, 6]);
  });

  it('should work with mixed iteratees', () => {
    const func = over([(x: number) => x * 2, (x: number) => x.toString(), (x: number) => x > 0]);
    expect(func(5)).toEqual([10, '5', true]);
  });

  it('should work with no iteratees', () => {
    const func = over([]);
    expect(func(5)).toEqual([]);
  });

  it('should work with functions that return undefined', () => {
    const func = over([
      (x: number) => x * 2,
      (x: number) => {
        console.log(x);
        return undefined;
      },
      (x: number) => x + 1,
    ]);
    expect(func(5)).toEqual([10, undefined, 6]);
  });

  it('should work with async functions', async () => {
    const func = over([async (x: number) => x * 2, async (x: number) => x + 1]);
    const result = await func(5);
    expect(result).toEqual([10, 6]);
  });
});
