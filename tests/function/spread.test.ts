import { spread } from '../../src/function/spread';

describe('spread', () => {
  it('should create function that spreads array arguments', () => {
    const say = spread((who: string, what: string) => who + ' says ' + what);
    expect(say(['fred', 'hello'])).toBe('fred says hello');
  });

  it('should work with default start position', () => {
    const add = spread((a: number, b: number, c: number) => a + b + c);
    expect(add([1, 2, 3])).toBe(6);
  });

  it('should work with custom start position', () => {
    const func = spread((a: number, b: number) => a + b, 1);
    expect(func([0, 1, 2])).toBe(3); // 1 + 2
  });

  it('should work with start position 0', () => {
    const func = spread((a: number, b: number) => a + b, 0);
    expect(func([1, 2, 3])).toBe(3);
  });

  it('should work with single argument', () => {
    const func = spread((a: string) => a.toUpperCase());
    expect(func(['hello'])).toBe('HELLO');
  });

  it('should work with empty array', () => {
    const func = spread(() => 'empty');
    expect(func([])).toBe('empty');
  });

  it('should work with more array elements than function parameters', () => {
    const func = spread((a: number, b: number) => a + b);
    expect(func([1, 2, 3, 4, 5])).toBe(3);
  });

  it('should work with fewer array elements than function parameters', () => {
    const func = spread((a: number, b: number, c: number) => a + b + c);
    expect(func([1, 2])).toBe(NaN); // 1 + 2 + undefined
  });

  it('should work with string arguments', () => {
    const func = spread((a: string, b: string, c: string) => a + b + c);
    expect(func(['a', 'b', 'c'])).toBe('abc');
  });
});
