import { functionsIn } from '../../src/object/functionsIn';

describe('functionsIn', () => {
  it('gets function property names including inherited', () => {
    function Foo() {
      this.a = 1;
      this.b = () => {};
    }
    Foo.prototype.c = function () {};

    const obj = new Foo();
    const result = functionsIn(obj);
    expect(result).toEqual(['b', 'c']);
  });

  it('handles empty object', () => {
    expect(functionsIn({})).toEqual([]);
  });

  it('handles object with no functions', () => {
    expect(functionsIn({ a: 1, b: 'hello', c: true })).toEqual([]);
  });

  it('handles null input', () => {
    expect(functionsIn(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(functionsIn(undefined)).toEqual([]);
  });

  it('handles non-object input', () => {
    expect(functionsIn('string')).toEqual([]);
    expect(functionsIn(123)).toEqual([]);
    expect(functionsIn(true)).toEqual([]);
  });
});
