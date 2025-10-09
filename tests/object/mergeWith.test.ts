import { mergeWith } from '../../src/object/mergeWith';

describe('mergeWith', () => {
  it('merges with customizer for arrays (concatenate)', () => {
    const object = { a: [1] } as any;
    const other = { a: [2] } as any;
    const customizer = (objValue: any, srcValue: any) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
      return undefined;
    };
    const result = mergeWith(object, other, customizer);
    expect(result.a).toEqual([1, 2]);
  });
  it('falls back to default merge', () => {
    const result = mergeWith({ a: { b: 1 } }, { a: { c: 2 } }, () => undefined);
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  it('should handle non-object input', () => {
    const result = mergeWith(null as any, { a: 1 });
    expect(result).toBe(null);

    const result2 = mergeWith(undefined as any, { a: 1 });
    expect(result2).toBe(undefined);

    const result3 = mergeWith('string' as any, { a: 1 });
    expect(result3).toBe('string');
  });

  it('should handle non-object sources', () => {
    const object = { a: 1 };
    const result = mergeWith(object, null, undefined, 'string', { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should merge without customizer', () => {
    const object = { a: { b: 1 } };
    const source = { a: { c: 2 }, d: 3 };
    const result = mergeWith(object, source);
    expect(result).toEqual({ a: { b: 1, c: 2 }, d: 3 });
  });

  it('should handle undefined object values', () => {
    const object = { a: 1 };
    const source = { b: 2, c: 3 };
    const result = mergeWith(object, source);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle customizer returning undefined', () => {
    const object = { a: { b: 1 } };
    const source = { a: { c: 2 } };
    const customizer = () => undefined;
    const result = mergeWith(object, source, customizer);
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  it('should handle customizer with all parameters', () => {
    const object = { a: 1 };
    const source = { b: 2 };
    const customizer = (objValue: any, srcValue: any, key: string, _obj: any, _src: any) => {
      if (key === 'b') {
        return (objValue || 0) + srcValue; // Handle undefined objValue
      }
      return undefined;
    };
    const result = mergeWith(object, source, customizer);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle arrays without customizer', () => {
    const object = { a: [1, 2] };
    const source = { a: [3, 4] };
    const result = mergeWith(object, source);
    // mergeWith doesn't merge arrays by default, it keeps the original
    expect(result).toEqual({ a: [1, 2] });
  });

  it('should handle mixed types without customizer', () => {
    const object = { a: { b: 1 }, c: [1, 2] };
    const source = { a: { d: 2 }, c: [3, 4], e: 5 };
    const result = mergeWith(object, source);
    // mergeWith doesn't merge arrays by default, it keeps the original
    expect(result).toEqual({ a: { b: 1, d: 2 }, c: [1, 2], e: 5 });
  });

  it('should handle nested objects without customizer', () => {
    const object = { a: { b: { c: 1 } } };
    const source = { a: { b: { d: 2 } } };
    const result = mergeWith(object, source);
    expect(result).toEqual({ a: { b: { c: 1, d: 2 } } });
  });

  it('should handle multiple sources without customizer', () => {
    const object = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const result = mergeWith(object, source1, source2);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});
