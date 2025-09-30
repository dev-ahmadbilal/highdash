import { has } from '../../src/object/has';

describe('has', () => {
  it('should return true for direct properties', () => {
    const object = { a: 1, b: 2 };
    expect(has(object, 'a')).toBe(true);
    expect(has(object, 'b')).toBe(true);
  });

  it('should return false for non-existent properties', () => {
    const object = { a: 1 };
    expect(has(object, 'b')).toBe(false);
    expect(has(object, 'c')).toBe(false);
  });

  it('should return false for null or non-objects', () => {
    expect(has(null, 'a')).toBe(false);
    expect(has(undefined, 'a')).toBe(false);
    expect(has(42, 'a')).toBe(false);
  });

  it('should work with nested properties', () => {
    const object = { a: { b: { c: 1 } } };
    expect(has(object, 'a.b.c')).toBe(true);
    expect(has(object, 'a.b')).toBe(true);
    expect(has(object, 'a.b.d')).toBe(false);
  });

  it('should work with array notation', () => {
    const object = { a: [1, 2, 3] };
    expect(has(object, 'a[0]')).toBe(true);
    expect(has(object, 'a[1]')).toBe(true);
    expect(has(object, 'a[5]')).toBe(false);
  });
});
