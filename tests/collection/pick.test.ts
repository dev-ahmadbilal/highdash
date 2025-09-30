import { pick } from '../../src/collection/pick';

describe('pick', () => {
  it('should pick specified properties', () => {
    const object = { a: 1, b: '2', c: 3 };
    const result = pick(object, ['a', 'c']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should handle non-existent properties', () => {
    const object = { a: 1, b: 2 };
    const result = pick(object, ['a', 'c']);
    expect(result).toEqual({ a: 1 });
  });

  it('should handle empty paths', () => {
    const object = { a: 1, b: 2 };
    const result = pick(object, []);
    expect(result).toEqual({});
  });

  it('should handle null/undefined object', () => {
    expect(pick(null as any, ['a'])).toEqual({});
    expect(pick(undefined as any, ['a'])).toEqual({});
  });

  it('should handle non-object', () => {
    expect(pick('string' as any, ['a'])).toEqual({});
  });
});
