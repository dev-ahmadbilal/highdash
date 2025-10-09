import { groupToMap } from '../../src/collection/groupToMap.js';

describe('groupToMap', () => {
  it('should group by function iteratee', () => {
    const collection = [6.1, 4.2, 6.3];
    const result = groupToMap(collection, Math.floor);

    expect(result).toBeInstanceOf(Map);
    expect(result.get(4)).toEqual([4.2]);
    expect(result.get(6)).toEqual([6.1, 6.3]);
  });

  it('should group by string iteratee', () => {
    const collection = ['one', 'two', 'three'];
    const result = groupToMap(collection, 'length');

    expect(result).toBeInstanceOf(Map);
    expect(result.get(3)).toEqual(['one', 'two']);
    expect(result.get(5)).toEqual(['three']);
  });

  it('should group by deep path', () => {
    const collection = [
      { user: { name: 'fred', age: 40 } },
      { user: { name: 'barney', age: 36 } },
      { user: { name: 'fred', age: 40 } },
    ];
    const result = groupToMap(collection, 'user.name');

    expect(result).toBeInstanceOf(Map);
    expect(result.get('fred')).toHaveLength(2);
    expect(result.get('barney')).toHaveLength(1);
  });

  it('should handle empty collection', () => {
    const result = groupToMap([], 'length');
    expect(result).toBeInstanceOf(Map);
    expect(result.size).toBe(0);
  });

  it('should handle null/undefined values', () => {
    const collection = [1, null, 2, undefined, 1];
    const result = groupToMap(collection, (x) => x);

    expect(result.get(1)).toEqual([1, 1]);
    expect(result.get(null)).toEqual([null]);
    expect(result.get(undefined)).toEqual([undefined]);
    expect(result.get(2)).toEqual([2]);
  });

  it('should handle object collection', () => {
    const collection = { a: 1, b: 2, c: 1 };
    const result = groupToMap(collection, (x) => x);

    expect(result.get(1)).toEqual([1, 1]);
    expect(result.get(2)).toEqual([2]);
  });

  it('should handle complex objects', () => {
    const collection = [
      { name: 'fred', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 },
    ];
    const result = groupToMap(collection, 'name');

    expect(result.get('fred')).toHaveLength(2);
    expect(result.get('barney')).toHaveLength(1);
    expect(result.get('fred')[0]).toEqual({ name: 'fred', age: 40 });
    expect(result.get('fred')[1]).toEqual({ name: 'fred', age: 40 });
  });
});
