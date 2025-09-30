import { unset } from '../../src/object/unset';

describe('unset', () => {
  it('removes property at path', () => {
    const object: any = { a: [{ b: { c: 7 } }] };
    const result = unset(object, 'a[0].b.c');
    expect(result).toBe(true);
    expect(object.a[0].b.c).toBeUndefined();
  });

  it('returns false if path does not exist', () => {
    const object: any = { a: { b: { c: 7 } } };
    const result = unset(object, 'a.b.d');
    expect(result).toBe(false);
  });

  it('handles null input', () => {
    const result = unset(null, 'a.b');
    expect(result).toBe(false);
  });

  it('handles undefined input', () => {
    const result = unset(undefined, 'a.b');
    expect(result).toBe(false);
  });

  it('handles non-object input', () => {
    const result = unset('string', 'a.b');
    expect(result).toBe(false);
  });

  it('removes nested property', () => {
    const object: any = { a: { b: { c: 7, d: 8 } } };
    const result = unset(object, 'a.b.c');
    expect(result).toBe(true);
    expect(object.a.b.c).toBeUndefined();
    expect(object.a.b.d).toBe(8);
  });
});
