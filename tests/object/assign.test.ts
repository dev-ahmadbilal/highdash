import { assign } from '../../src/object/assign';

describe('assign', () => {
  it('should assign properties from sources to target', () => {
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const result = assign(target, source1, source2);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).toBe(target);
  });

  it('should handle empty sources', () => {
    const target = { a: 1 };
    const result = assign(target);
    expect(result).toEqual({ a: 1 });
  });

  it('should handle null/undefined sources', () => {
    const target = { a: 1 };
    const result = assign(target, null, undefined);
    expect(result).toEqual({ a: 1 });
  });

  it('should handle non-object target', () => {
    const result = assign(null as any, { a: 1 });
    expect(result).toBe(null);
  });

  it('should only copy own enumerable properties', () => {
    function Source() {
      this.a = 1;
      this.b = 2;
    }
    Source.prototype.c = 3;

    const target = {};
    const source = new (Source as any)();
    const result = assign(target, source);

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
