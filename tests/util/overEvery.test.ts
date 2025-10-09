import { overEvery } from '../../src/util/overEvery';

describe('overEvery', () => {
  it('should create function that checks if all predicates return truthy', () => {
    const func = overEvery([Boolean, (x: number) => x > 0]);
    expect(func(1)).toBe(true);
    expect(func(0)).toBe(false);
    expect(func(-1)).toBe(false);
  });

  it('should work with single predicate', () => {
    const func = overEvery([(x: number) => x > 0]);
    expect(func(1)).toBe(true);
    expect(func(-1)).toBe(false);
  });

  it('should work with multiple predicates', () => {
    const func = overEvery([(x: number) => x > 0, (x: number) => x < 10, (x: number) => x % 2 === 0]);
    expect(func(2)).toBe(true);
    expect(func(4)).toBe(true);
    expect(func(1)).toBe(false); // not even
    expect(func(12)).toBe(false); // not < 10
    expect(func(-2)).toBe(false); // not > 0
  });

  it('should work with different argument counts', () => {
    const func = overEvery([
      (a: number, _b: number) => a > 0,
      (a: number, b: number) => b > 0,
      (a: number, b: number) => a + b > 0,
    ]);
    expect(func(1, 2)).toBe(true);
    expect(func(-1, 2)).toBe(false);
    expect(func(1, -2)).toBe(false);
    expect(func(-1, -2)).toBe(false);
  });

  it('should work with string predicates', () => {
    const func = overEvery([
      (str: string) => str.length > 0,
      (str: string) => str.includes('a'),
      (str: string) => str.length < 10,
    ]);
    expect(func('apple')).toBe(true);
    expect(func('banana')).toBe(true);
    expect(func('hello')).toBe(false); // no 'a'
    expect(func('')).toBe(false); // empty
  });

  it('should work with array predicates', () => {
    const func = overEvery([
      (arr: number[]) => arr.length > 0,
      (arr: number[]) => arr.every((n) => n > 0),
      (arr: number[]) => arr.length < 5,
    ]);
    expect(func([1, 2, 3])).toBe(true);
    expect(func([1, 2, 3, 4, 5])).toBe(false); // too long
    expect(func([1, -2, 3])).toBe(false); // negative number
    expect(func([])).toBe(false); // empty
  });

  it('should work with object predicates', () => {
    const func = overEvery([(obj: any) => obj.a > 0, (obj: any) => obj.b > 0, (obj: any) => obj.a + obj.b > 0]);
    expect(func({ a: 1, b: 2 })).toBe(true);
    expect(func({ a: -1, b: 2 })).toBe(false);
    expect(func({ a: 1, b: -2 })).toBe(false);
  });

  it('should work with mixed predicates', () => {
    const func = overEvery([(x: number) => x > 0, (x: number) => x.toString().length > 0, (x: number) => x < 100]);
    expect(func(5)).toBe(true);
    expect(func(150)).toBe(false); // not < 100
    expect(func(-5)).toBe(false); // not > 0
  });

  it('should work with no predicates', () => {
    const func = overEvery([]);
    expect(func(5)).toBe(true); // empty array returns true
  });

  it('should work with functions that return falsy values', () => {
    const func = overEvery([
      (_x: number) => _x > 0,
      (x: number) => x < 10,
      (_x: number) => null, // falsy
      (x: number) => x % 2 === 0,
    ]);
    expect(func(2)).toBe(false); // null is falsy
    expect(func(4)).toBe(false); // null is falsy
  });

  it('should work with async predicates', async () => {
    const func = overEvery([async (x: number) => x > 0, async (x: number) => x < 10]);
    const result = await func(5);
    expect(result).toBe(true);
  });
});
