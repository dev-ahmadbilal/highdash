import { valuesIn } from '../../src/object/valuesIn';

describe('valuesIn', () => {
  it('gets values including inherited', () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const obj = new Foo();
    const result = valuesIn(obj);
    expect(result).toEqual([1, 2]);
  });

  it('handles empty object', () => {
    expect(valuesIn({})).toEqual([]);
  });

  it('handles object with own properties only', () => {
    expect(valuesIn({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  it('handles null input', () => {
    expect(valuesIn(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(valuesIn(undefined)).toEqual([]);
  });

  it('handles non-object input', () => {
    expect(valuesIn('string')).toEqual([]);
    expect(valuesIn(123)).toEqual([]);
    expect(valuesIn(true)).toEqual([]);
  });
});
