import { merge } from '../../src/core/merge';

describe('merge', () => {
  it('should merge objects', () => {
    const object = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = merge(object, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
    expect(result).toBe(object);
  });

  it('should merge nested objects', () => {
    const object = { a: { b: 1, c: 2 } };
    const source = { a: { c: 3, d: 4 } };
    const result = merge(object, source);

    expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
  });

  it('should merge arrays', () => {
    const object = { a: [1, 2] };
    const source = { a: [3, 4] };
    const result = merge(object, source);

    expect(result).toEqual({ a: [3, 4] });
  });

  it('should merge multiple sources', () => {
    const object = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const result = merge(object, source1, source2);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle null and undefined', () => {
    const object = { a: 1 };
    const result = merge(object, null, undefined);

    expect(result).toEqual({ a: 1 });
  });

  it('should handle non-objects', () => {
    const result = merge(null, { a: 1 });
    expect(result).toBe(null);
  });

  it('should merge arrays with plain objects', () => {
    const object = { a: [{ b: 1 }, { c: 2 }] };
    const source = { a: [{ d: 3 }, { e: 4 }] };
    const result = merge(object, source);

    expect(result).toEqual({
      a: [
        { b: 1, d: 3 },
        { c: 2, e: 4 },
      ],
    });
  });

  it('should merge nested arrays', () => {
    const object = {
      a: [
        [1, 2],
        [3, 4],
      ],
    };
    const source = {
      a: [
        [5, 6],
        [7, 8],
      ],
    };
    const result = merge(object, source);

    expect(result).toEqual({
      a: [
        [5, 6],
        [7, 8],
      ],
    });
  });

  it('should handle symbol properties', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const object = { a: 1, [sym1]: 'value1' };
    const source = { b: 2, [sym1]: 'value2', [sym2]: 'value3' };
    const result = merge(object, source);

    expect(result).toEqual({ a: 1, b: 2, [sym1]: 'value2', [sym2]: 'value3' });
  });

  it('should handle circular references', () => {
    const object: any = { a: 1 };
    object.self = object;
    const source = { b: 2 };
    const result = merge(object, source);

    expect(result).toEqual({ a: 1, b: 2, self: object });
    expect(result.self).toBe(object);
  });

  it('should overwrite non-plain objects with plain objects', () => {
    const date = new Date('2023-01-01');
    const object = { a: date };
    const source = { a: { b: 1, c: 2 } };
    const result = merge(object, source);

    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  it('should handle mixed array and object merging', () => {
    const object = { a: [{ b: 1 }, { c: 2 }] };
    const source = { a: [{ d: 3 }, { e: 4 }, { f: 5 }] };
    const result = merge(object, source);

    expect(result).toEqual({ a: [{ b: 1, d: 3 }, { c: 2, e: 4 }, { f: 5 }] });
  });

  it('should handle undefined values in arrays', () => {
    const object = { a: [1, 2, 3] };
    const source = { a: [undefined, 4, undefined] };
    const result = merge(object, source);

    expect(result).toEqual({ a: [1, 4, 3] });
  });

  it('should handle non-enumerable symbol properties', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const object = { a: 1 };
    const source = { b: 2 };

    // Add non-enumerable symbol
    Object.defineProperty(source, sym1, {
      value: 'non-enumerable',
      enumerable: false,
    });

    // Add enumerable symbol
    (source as any)[sym2] = 'enumerable';

    const result = merge(object, source);

    expect(result).toEqual({ a: 1, b: 2, [sym2]: 'enumerable' });
    expect((result as any)[sym1]).toBeUndefined();
  });

  it('should handle complex nested merging', () => {
    const object = {
      a: {
        b: [1, 2],
        c: { d: 3 },
      },
      e: [4, 5],
    };
    const source = {
      a: {
        b: [6, 7, 8],
        c: { e: 9 },
        f: 10,
      },
      e: [11, 12],
    };
    const result = merge(object, source);

    expect(result).toEqual({
      a: {
        b: [6, 7, 8],
        c: { d: 3, e: 9 },
        f: 10,
      },
      e: [11, 12],
    });
  });
});
