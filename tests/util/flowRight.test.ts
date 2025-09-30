import { flowRight } from '../../src/util/flowRight';

describe('flowRight', () => {
  it('should compose functions from right to left', () => {
    const add = (a: number, b: number) => a + b;
    const multiply = (x: number) => x * 2;
    const square = (x: number) => x * x;
    
    const composed = flowRight(square, multiply, add);
    expect(composed(1, 2)).toBe(36); // square(multiply(add(1, 2))) = square(multiply(3)) = square(6) = 36
  });

  it('should work with single function', () => {
    const double = (x: number) => x * 2;
    const composed = flowRight(double);
    expect(composed(5)).toBe(10);
  });

  it('should work with no functions', () => {
    const composed = flowRight();
    expect(composed(5)).toBe(5);
  });

  it('should work with string functions', () => {
    const addPrefix = (str: string) => 'Hello ' + str;
    const addSuffix = (str: string) => str + '!';
    const toUpper = (str: string) => str.toUpperCase();
    
    const composed = flowRight(toUpper, addSuffix, addPrefix);
    expect(composed('world')).toBe('HELLO WORLD!');
  });

  it('should work with different argument counts', () => {
    const add = (a: number, b: number) => a + b;
    const multiply = (x: number) => x * 2;
    
    const composed = flowRight(multiply, add);
    expect(composed(1, 2)).toBe(6); // multiply(add(1, 2)) = multiply(3) = 6
  });

  it('should work with array functions', () => {
    const reverse = (arr: number[]) => arr.reverse();
    const sort = (arr: number[]) => arr.sort((a, b) => a - b);
    
    const composed = flowRight(reverse, sort);
    expect(composed([3, 1, 2])).toEqual([3, 2, 1]);
  });

  it('should work with object functions', () => {
    const addProperty = (obj: any) => ({ ...obj, c: 3 });
    const multiplyValues = (obj: any) => Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, (v as number) * 2])
    );
    
    const composed = flowRight(multiplyValues, addProperty);
    expect(composed({ a: 1, b: 2 })).toEqual({ a: 2, b: 4, c: 6 });
  });

  it('should handle functions that return undefined', () => {
    const log = (x: any) => { console.log(x); return x; };
    const double = (x: number) => x * 2;
    
    const composed = flowRight(double, log);
    expect(composed(5)).toBe(10);
  });

  it('should work with async functions', async () => {
    const asyncAdd = async (a: number, b: number) => a + b;
    const asyncMultiply = async (x: number) => x * 2;
    
    const composed = flowRight(asyncMultiply, asyncAdd);
    const result = await composed(1, 2);
    expect(result).toBe(6);
  });
});
