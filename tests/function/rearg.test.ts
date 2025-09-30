import { rearg } from '../../src/function/rearg';

describe('rearg', () => {
  it('should rearrange function arguments', () => {
    const func = (a: string, b: string, c: string) => [a, b, c].join('-');
    const rearged = rearg(func, [2, 0, 1]);
    expect(rearged('a', 'b', 'c')).toBe('c-a-b');
  });

  it('should work with different argument orders', () => {
    const func = (a: number, b: number, c: number) => a + b + c;
    const rearged = rearg(func, [1, 2, 0]);
    expect(rearged(1, 2, 3)).toBe(2 + 3 + 1); // 6
  });

  it('should work with two arguments', () => {
    const func = (a: string, b: string) => a + b;
    const rearged = rearg(func, [1, 0]);
    expect(rearged('a', 'b')).toBe('ba');
  });

  it('should work with single argument', () => {
    const func = (a: string) => a.toUpperCase();
    const rearged = rearg(func, [0]);
    expect(rearged('hello')).toBe('HELLO');
  });

  it('should work with more arguments than needed', () => {
    const func = (a: string, b: string) => a + b;
    const rearged = rearg(func, [1, 0]);
    expect(rearged('a', 'b', 'c', 'd')).toBe('ba');
  });

  it('should work with fewer arguments than needed', () => {
    const func = (a: string, b: string, c: string) => a + b + c;
    const rearged = rearg(func, [1, 0]);
    expect(rearged('a', 'b')).toBe('baundefined');
  });
});
