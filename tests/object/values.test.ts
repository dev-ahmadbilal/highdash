import { values } from '../../src/object/values';

describe('values', () => {
  it('should return values of object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = values(obj);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle empty object', () => {
    expect(values({})).toEqual([]);
  });

  it('should handle null/undefined', () => {
    expect(values(null as any)).toEqual([]);
    expect(values(undefined as any)).toEqual([]);
  });

  it('should handle non-object', () => {
    expect(values('string' as any)).toEqual([]);
  });

  it('should only return own enumerable properties', () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    const foo = new (Foo as any)();
    const result = values(foo);
    expect(result).toEqual([1, 2]);
  });
});
