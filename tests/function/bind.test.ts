import { bind } from '../../src/function/bind';

describe('bind', () => {
  it('should bind function with this context', () => {
    const obj = {
      value: 42,
      getValue: function() {
        return this.value;
      }
    };

    const boundFunc = bind(obj.getValue, obj);
    expect(boundFunc()).toBe(42);
  });

  it('should bind function with partial arguments', () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const boundAdd = bind(add, null, 1, 2);
    expect(boundAdd(3)).toBe(6);
  });

  it('should bind function with this context and partial arguments', () => {
    const obj = {
      multiplier: 2,
      calculate: function(a: number, b: number) {
        return (a + b) * this.multiplier;
      }
    };

    const boundCalc = bind(obj.calculate, obj, 5);
    expect(boundCalc(3)).toBe(16); // (5 + 3) * 2 = 16
  });

  it('should work with arrow functions', () => {
    const arrowFunc = (a: number, b: number) => a + b;
    const boundArrow = bind(arrowFunc, null, 10);
    expect(boundArrow(5)).toBe(15);
  });

  it('should handle no partial arguments', () => {
    const func = (a: number, b: number) => a + b;
    const boundFunc = bind(func, null);
    expect(boundFunc(1, 2)).toBe(3);
  });

  it('should handle all arguments as partials', () => {
    const func = (a: number, b: number) => a + b;
    const boundFunc = bind(func, null, 1, 2);
    expect(boundFunc()).toBe(3);
  });
});
