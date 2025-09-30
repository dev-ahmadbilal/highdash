import { toPairsIn } from '../../src/object/toPairsIn';

describe('toPairsIn', () => {
  it('converts object to key-value pairs including inherited', () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;
    
    const obj = new Foo();
    const result = toPairsIn(obj);
    expect(result).toEqual([['a', 1], ['b', 2]]);
  });

  it('handles empty object', () => {
    expect(toPairsIn({})).toEqual([]);
  });

  it('handles object with own properties only', () => {
    expect(toPairsIn({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]]);
  });

  it('handles null input', () => {
    expect(toPairsIn(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(toPairsIn(undefined)).toEqual([]);
  });

  it('handles non-object input', () => {
    expect(toPairsIn('string')).toEqual([]);
    expect(toPairsIn(123)).toEqual([]);
    expect(toPairsIn(true)).toEqual([]);
  });
});
