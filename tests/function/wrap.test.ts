import { wrap } from '../../src/function/wrap';

describe('wrap', () => {
  it('should wrap value with function', () => {
    const value = 'hello';
    const wrapper = (val: string, prefix: string) => prefix + val;
    const wrapped = wrap(value, wrapper);
    expect(wrapped('!')).toBe('!hello');
  });

  it('should work with multiple arguments', () => {
    const value = 42;
    const wrapper = (val: number, a: number, b: number) => val + a + b;
    const wrapped = wrap(value, wrapper);
    expect(wrapped(1, 2)).toBe(45); // 42 + 1 + 2
  });

  it('should work with no additional arguments', () => {
    const value = { name: 'test' };
    const wrapper = (val: { name: string }) => val.name.toUpperCase();
    const wrapped = wrap(value, wrapper);
    expect(wrapped()).toBe('TEST');
  });

  it('should preserve this context', () => {
    const value = 10;
    const obj = {
      multiplier: 2,
      wrapper: function (val: number, add: number) {
        return (val + add) * this.multiplier;
      },
    };
    const wrapped = wrap(value, obj.wrapper);
    expect(wrapped.call(obj, 5)).toBe(30); // (10 + 5) * 2
  });

  it('should work with different value types', () => {
    const value = [1, 2, 3];
    const wrapper = (val: number[], index: number) => val[index];
    const wrapped = wrap(value, wrapper);
    expect(wrapped(1)).toBe(2);
  });

  it('should work with boolean values', () => {
    const value = true;
    const wrapper = (val: boolean, negate: boolean) => (negate ? !val : val);
    const wrapped = wrap(value, wrapper);
    expect(wrapped(true)).toBe(false);
  });

  it('should work with null values', () => {
    const value = null;
    const wrapper = (val: null, fallback: string) => val || fallback;
    const wrapped = wrap(value, wrapper);
    expect(wrapped('default')).toBe('default');
  });
});
