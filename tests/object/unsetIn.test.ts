import { unsetIn } from '../../src/object/unsetIn.js';

describe('unsetIn', () => {
  it('should unset value at simple path', () => {
    const object = { a: 1, b: 2 };
    const result = unsetIn(object, 'a');

    expect(result).toEqual({ b: 2 });
    expect(result).not.toBe(object);
  });

  it('should unset value at nested path', () => {
    const object = { a: { b: 1, c: 2 } };
    const result = unsetIn(object, 'a.b');

    expect(result).toEqual({ a: { c: 2 } });
    expect(result).not.toBe(object);
    expect(result.a).not.toBe(object.a);
  });

  it('should unset value at array path', () => {
    const object = { a: [1, 2, 3] };
    const result = unsetIn(object, 'a.1');

    expect(result).toEqual({ a: [1, 3] });
    expect(result).not.toBe(object);
    expect(result.a).not.toBe(object.a);
  });

  it('should handle array notation', () => {
    const object = { a: [1, 2, 3] };
    const result = unsetIn(object, 'a[1]');

    expect(result).toEqual({ a: [1, 3] });
  });

  it('should handle mixed path notation', () => {
    const object = { a: { b: [1, 2, 3] } };
    const result = unsetIn(object, 'a.b[1]');

    expect(result).toEqual({ a: { b: [1, 3] } });
  });

  it('should handle array path', () => {
    const object = { a: { b: { c: 1 } } };
    const result = unsetIn(object, ['a', 'b', 'c']);

    expect(result).toEqual({ a: { b: {} } });
  });

  it('should handle non-existent paths', () => {
    const object = { a: 1 };
    const result = unsetIn(object, 'b.c');

    expect(result).toEqual({ a: 1, b: {} });
    expect(result).not.toBe(object);
  });

  it('should handle empty path', () => {
    const object = { a: 1 };
    const result = unsetIn(object, '');

    expect(result).toEqual({ a: 1 });
    expect(result).toBe(object); // Should return original object for empty path
  });

  it('should handle complex nested structures', () => {
    const object = {
      a: {
        b: [1, 2, { c: 3, d: 4 }],
        e: { f: 5 },
      },
    };
    const result = unsetIn(object, 'a.b.2.c');

    expect(result).toEqual({
      a: {
        b: [1, 2, { d: 4 }],
        e: { f: 5 },
      },
    });
  });

  it('should handle unsetting from empty object', () => {
    const object = {};
    const result = unsetIn(object, 'a.b');

    expect(result).toEqual({ a: {} });
    expect(result).not.toBe(object);
  });

  it('should handle unsetting from array', () => {
    const object = [1, 2, 3];
    const result = unsetIn(object, '1');

    expect(result).toEqual([1, 3]);
    expect(result).not.toBe(object);
  });

  it('should handle unsetting nested array elements', () => {
    const object = {
      a: [
        [1, 2],
        [3, 4],
      ],
    };
    const result = unsetIn(object, 'a.0.1');

    expect(result).toEqual({ a: [[1], [3, 4]] });
  });
});
