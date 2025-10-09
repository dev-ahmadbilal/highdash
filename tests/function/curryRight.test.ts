import { curryRight } from '../../src/function/curryRight';

describe('curryRight', () => {
  it('curries function from right', () => {
    const abc = (a: string, b: string, c: string) => [a, b, c];
    const curried = curryRight(abc);

    expect(curried('c')('b')('a')).toEqual(['a', 'b', 'c']);
  });

  it('handles arity parameter', () => {
    const abc = (a: string, b: string, c: string) => [a, b, c];
    const curried = curryRight(abc, 2);

    expect(curried('c', 'b')('a')).toEqual(['a', 'b', 'c']);
  });

  it('handles single argument', () => {
    const fn = (x: number) => x * 2;
    const curried = curryRight(fn);

    expect(curried(5)).toBe(10);
  });

  it('handles no arguments', () => {
    const fn = () => 'hello';
    const curried = curryRight(fn);

    expect(curried()).toBe('hello');
  });
});
