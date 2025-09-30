import { rest } from '../../src/function/rest';

describe('rest', () => {
  it('should create function with rest parameters', () => {
    const say = rest((what: string, names: string[]) => what + ' ' + names.join(', '));
    expect(say('hello', 'fred', 'barney', 'pebbles')).toBe('hello fred, barney, pebbles');
  });

  it('should work with default start position', () => {
    const func = (a: number, b: number, c: number[]) => a + b + c.length;
    const restFunc = rest(func);
    expect(restFunc(1, 2, 3, 4, 5)).toBe(1 + 2 + 3); // 6
  });

  it('should work with custom start position', () => {
    const func = (a: number, b: number[], c: number) => a + b.length + c;
    const restFunc = rest(func, 1);
    expect(restFunc(1, 2, 3, 4, 5)).toBe(1 + 4 + 5); // 10
  });

  it('should work with start position 0', () => {
    const func = (args: number[]) => args.reduce((sum, n) => sum + n, 0);
    const restFunc = rest(func, 0);
    expect(restFunc(1, 2, 3, 4)).toBe(10);
  });

  it('should work with start position beyond function length', () => {
    const func = (a: number, b: number) => a + b;
    const restFunc = rest(func, 5);
    expect(restFunc(1, 2, 3, 4, 5, 6)).toBe(1 + 2); // 3
  });

  it('should handle negative start position', () => {
    const func = (a: number, b: number, c: number[]) => a + b + c.length;
    const restFunc = rest(func, -1);
    expect(restFunc(1, 2, 3, 4, 5)).toBe(1 + 2 + 3); // 6
  });

  it('should work with string arguments', () => {
    const join = rest((separator: string, words: string[]) => words.join(separator));
    expect(join('-', 'a', 'b', 'c')).toBe('a-b-c');
  });
});
