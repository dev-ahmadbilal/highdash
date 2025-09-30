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
});
