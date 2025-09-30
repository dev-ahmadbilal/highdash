import { overSome } from '../../src/util/overSome';

describe('overSome', () => {
  it('should create function that checks if any predicates return truthy', () => {
    const func = overSome([Boolean, (x: number) => x > 0]);
    expect(func(1)).toBe(true);
    expect(func(0)).toBe(false);
    expect(func(-1)).toBe(true);
  });

  it('should work with single predicate', () => {
    const func = overSome([(x: number) => x > 0]);
    expect(func(1)).toBe(true);
    expect(func(-1)).toBe(false);
  });

  it('should work with multiple predicates', () => {
    const func = overSome([(x: number) => x > 10, (x: number) => x < 0, (x: number) => x % 2 === 0]);
    expect(func(2)).toBe(true); // even
    expect(func(15)).toBe(true); // > 10
    expect(func(-5)).toBe(true); // < 0
    expect(func(1)).toBe(false); // none match
  });

  it('should work with different argument counts', () => {
    const func = overSome([
      (a: number, b: number) => a > 0,
      (a: number, b: number) => b > 0,
      (a: number, b: number) => a + b > 0,
    ]);
    expect(func(1, 2)).toBe(true);
    expect(func(-1, 2)).toBe(true); // b > 0
    expect(func(1, -2)).toBe(true); // a > 0
    expect(func(-1, -2)).toBe(false); // none match
  });

  it('should work with string predicates', () => {
    const func = overSome([
      (str: string) => str.length === 0,
      (str: string) => str.includes('a'),
      (str: string) => str.length > 10,
    ]);
    expect(func('apple')).toBe(true); // includes 'a'
    expect(func('banana')).toBe(true); // includes 'a'
    expect(func('hello')).toBe(false); // none match
    expect(func('')).toBe(true); // empty string
  });

  it('should work with array predicates', () => {
    const func = overSome([
      (arr: number[]) => arr.length === 0,
      (arr: number[]) => arr.some((n) => n > 0),
      (arr: number[]) => arr.length > 5,
    ]);
    expect(func([1, 2, 3])).toBe(true); // some > 0
    expect(func([1, 2, 3, 4, 5, 6])).toBe(true); // length > 5
    expect(func([])).toBe(true); // empty
    expect(func([-1, -2, -3])).toBe(false); // none match
  });

  it('should work with object predicates', () => {
    const func = overSome([(obj: any) => obj.a > 0, (obj: any) => obj.b > 0, (obj: any) => obj.a + obj.b > 0]);
    expect(func({ a: 1, b: 2 })).toBe(true);
    expect(func({ a: -1, b: 2 })).toBe(true); // b > 0
    expect(func({ a: 1, b: -2 })).toBe(true); // a > 0
    expect(func({ a: -1, b: -2 })).toBe(false); // none match
  });

  it('should work with mixed predicates', () => {
    const func = overSome([(x: number) => x > 100, (x: number) => x.toString().length > 2, (x: number) => x < 0]);
    expect(func(5)).toBe(false); // none match
    expect(func(150)).toBe(true); // > 100
    expect(func(-5)).toBe(true); // < 0
  });

  it('should work with no predicates', () => {
    const func = overSome([]);
    expect(func(5)).toBe(false); // empty array returns false
  });

  it('should work with functions that return falsy values', () => {
    const func = overSome([
      (x: number) => x > 10,
      (x: number) => null, // falsy
      (x: number) => x % 2 === 0,
    ]);
    expect(func(2)).toBe(true); // even
    expect(func(15)).toBe(true); // > 10
    expect(func(1)).toBe(false); // none match
  });

  it('should work with async predicates', async () => {
    const func = overSome([async (x: number) => x > 10, async (x: number) => x < 0]);
    const result1 = await func(15);
    const result2 = await func(5);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });
});
