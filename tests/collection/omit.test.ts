import { omit } from '../../src/collection/omit';

describe('omit', () => {
  it('should omit specified properties', () => {
    const object = { a: 1, b: '2', c: 3 };
    const result = omit(object, ['a', 'c']);
    expect(result).toEqual({ b: '2' });
  });

  it('should handle non-existent properties', () => {
    const object = { a: 1, b: 2 };
    const result = omit(object, ['c', 'd']);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle empty paths', () => {
    const object = { a: 1, b: 2 };
    const result = omit(object, []);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle null/undefined object', () => {
    expect(omit(null as any, ['a'])).toEqual({});
    expect(omit(undefined as any, ['a'])).toEqual({});
  });

  it('should handle non-object', () => {
    expect(omit('string' as any, ['a'])).toEqual({});
  });
});
