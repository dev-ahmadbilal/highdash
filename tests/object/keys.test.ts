import { keys } from '../../src/object/keys';

describe('keys', () => {
  it('should return keys of object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = keys(obj);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty object', () => {
    expect(keys({})).toEqual([]);
  });

  it('should handle null/undefined', () => {
    expect(keys(null as any)).toEqual([]);
    expect(keys(undefined as any)).toEqual([]);
  });

  it('should handle non-object', () => {
    expect(keys('string' as any)).toEqual([]);
  });

  it('should only return own enumerable properties', () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    const foo = new (Foo as any)();
    const result = keys(foo);
    expect(result).toEqual(['a', 'b']);
  });
});
