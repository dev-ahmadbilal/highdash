import { indexBy } from '../../src/collection/indexBy.js';

describe('indexBy', () => {
  it('should index by function iteratee', () => {
    const collection = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 },
    ];
    const result = indexBy(collection, 'dir');

    expect(result).toBeInstanceOf(Map);
    expect(result.get('left')).toEqual({ dir: 'left', code: 97 });
    expect(result.get('right')).toEqual({ dir: 'right', code: 100 });
  });

  it('should index by string iteratee', () => {
    const collection = [
      { name: 'fred', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 50 },
    ];
    const result = indexBy(collection, 'name');

    expect(result).toBeInstanceOf(Map);
    expect(result.get('fred')).toEqual({ name: 'fred', age: 50 });
    expect(result.get('barney')).toEqual({ name: 'barney', age: 36 });
  });

  it('should index by deep path', () => {
    const collection = [
      { user: { name: 'fred', age: 40 } },
      { user: { name: 'barney', age: 36 } },
      { user: { name: 'fred', age: 40 } },
    ];
    const result = indexBy(collection, 'user.name');

    expect(result).toBeInstanceOf(Map);
    expect(result.get('fred')).toEqual({ user: { name: 'fred', age: 40 } });
    expect(result.get('barney')).toEqual({ user: { name: 'barney', age: 36 } });
  });

  it('should handle empty collection', () => {
    const result = indexBy([], 'name');
    expect(result).toBeInstanceOf(Map);
    expect(result.size).toBe(0);
  });

  it('should handle null/undefined values', () => {
    const collection = [1, null, 2, undefined, 1];
    const result = indexBy(collection, (x) => x);

    expect(result.get(1)).toBe(1);
    expect(result.get(null)).toBe(null);
    expect(result.get(undefined)).toBe(undefined);
    expect(result.get(2)).toBe(2);
  });

  it('should handle object collection', () => {
    const collection = { a: 1, b: 2, c: 1 };
    const result = indexBy(collection, (x) => x);

    expect(result.get(1)).toBe(1);
    expect(result.get(2)).toBe(2);
  });

  it('should use last value for duplicate keys', () => {
    const collection = [
      { name: 'fred', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 50 },
    ];
    const result = indexBy(collection, 'name');

    expect(result.get('fred')).toEqual({ name: 'fred', age: 50 });
    expect(result.get('barney')).toEqual({ name: 'barney', age: 36 });
  });
});
