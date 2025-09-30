import { bindKey } from '../../src/function/bindKey';

describe('bindKey', () => {
  it('should bind method with this context', () => {
    const obj = {
      value: 42,
      getValue: function() {
        return this.value;
      }
    };

    const boundFunc = bindKey(obj, 'getValue');
    expect(boundFunc()).toBe(42);
  });

  it('should bind method with partial arguments', () => {
    const obj = {
      multiplier: 2,
      calculate: function(a: number, b: number) {
        return (a + b) * this.multiplier;
      }
    };

    const boundCalc = bindKey(obj, 'calculate', 5);
    expect(boundCalc(3)).toBe(16); // (5 + 3) * 2 = 16
  });

  it('should bind method with this context and partial arguments', () => {
    const obj = {
      prefix: 'Hello',
      greet: function(name: string, suffix: string) {
        return `${this.prefix} ${name}${suffix}`;
      }
    };

    const boundGreet = bindKey(obj, 'greet', 'World');
    expect(boundGreet('!')).toBe('Hello World!');
  });

  it('should handle no partial arguments', () => {
    const obj = {
      add: function(a: number, b: number) {
        return a + b;
      }
    };

    const boundAdd = bindKey(obj, 'add');
    expect(boundAdd(1, 2)).toBe(3);
  });

  it('should handle all arguments as partials', () => {
    const obj = {
      multiply: function(a: number, b: number) {
        return a * b;
      }
    };

    const boundMultiply = bindKey(obj, 'multiply', 3, 4);
    expect(boundMultiply()).toBe(12);
  });

  it('should throw error for non-function property', () => {
    const obj = {
      value: 42
    };

    expect(() => {
      bindKey(obj, 'value');
    }).toThrow('Expected a function');
  });
});
