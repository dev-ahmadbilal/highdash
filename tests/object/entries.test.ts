import { entries } from '../../src/object/entries';

describe('entries', () => {
  it('should return entries of object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = entries(obj);
    expect(result).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it('should handle empty object', () => {
    expect(entries({})).toEqual([]);
  });

  it('should handle null/undefined', () => {
    expect(entries(null as any)).toEqual([]);
    expect(entries(undefined as any)).toEqual([]);
  });

  it('should handle non-object', () => {
    expect(entries('string' as any)).toEqual([]);
  });

  it('should only return own enumerable properties', () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    const foo = new (Foo as any)();
    const result = entries(foo);
    expect(result).toEqual([['a', 1], ['b', 2]]);
  });
});
