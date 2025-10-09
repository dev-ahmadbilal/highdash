import { unary } from '../../src/function/unary';

describe('unary', () => {
  it('should create function that accepts only one argument', () => {
    const func = (a: number, b: number, c: number) => a + b + c;
    const unaryFunc = unary(func);
    expect(unaryFunc(1, 2, 3)).toBe(1); // Only first argument is used
  });

  it('should work with single argument function', () => {
    const func = (a: number) => a * 2;
    const unaryFunc = unary(func);
    expect(unaryFunc(5)).toBe(10);
  });

  it('should work with no argument function', () => {
    const func = () => 'hello';
    const unaryFunc = unary(func);
    expect(unaryFunc(1, 2, 3)).toBe('hello');
  });

  it('should work with string arguments', () => {
    const func = (a: string, b: string, c: string) => a + b + c;
    const unaryFunc = unary(func);
    expect(unaryFunc('a', 'b', 'c')).toBe('a');
  });

  it('should work with mixed type arguments', () => {
    const func = (a: string, b: number, c: boolean) => a + b + c;
    const unaryFunc = unary(func);
    expect(unaryFunc('hello', 42, true)).toBe('hello');
  });

  it('should preserve this context', () => {
    const obj = {
      value: 10,
      add: function (a: number, b: number) {
        return this.value + a + b;
      },
    };
    const unaryAdd = unary(obj.add);
    expect(unaryAdd.call(obj, 1, 2)).toBe(11); // 10 + 1
  });

  it('should work with arrow functions', () => {
    const arrowFunc = (a: number, b: number) => a + b;
    const unaryArrow = unary(arrowFunc);
    expect(unaryArrow(5, 10)).toBe(5);
  });
});
