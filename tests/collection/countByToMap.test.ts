import { countByToMap } from '../../src/collection/countByToMap.js';

describe('countByToMap', () => {
  it('should count by function iteratee', () => {
    const collection = [6.1, 4.2, 6.3];
    const result = countByToMap(collection, Math.floor);
    
    expect(result).toBeInstanceOf(Map);
    expect(result.get(4)).toBe(1);
    expect(result.get(6)).toBe(2);
  });

  it('should count by string iteratee', () => {
    const collection = ['one', 'two', 'three'];
    const result = countByToMap(collection, 'length');
    
    expect(result).toBeInstanceOf(Map);
    expect(result.get(3)).toBe(2);
    expect(result.get(5)).toBe(1);
  });

  it('should count by deep path', () => {
    const collection = [
      { user: { name: 'fred', age: 40 } },
      { user: { name: 'barney', age: 36 } },
      { user: { name: 'fred', age: 40 } }
    ];
    const result = countByToMap(collection, 'user.age');
    
    expect(result).toBeInstanceOf(Map);
    expect(result.get(40)).toBe(2);
    expect(result.get(36)).toBe(1);
  });

  it('should handle empty collection', () => {
    const result = countByToMap([], 'length');
    expect(result).toBeInstanceOf(Map);
    expect(result.size).toBe(0);
  });

  it('should handle null/undefined values', () => {
    const collection = [1, null, 2, undefined, 1];
    const result = countByToMap(collection, x => x);
    
    expect(result.get(1)).toBe(2);
    expect(result.get(null)).toBe(1);
    expect(result.get(undefined)).toBe(1);
    expect(result.get(2)).toBe(1);
  });

  it('should handle object collection', () => {
    const collection = { a: 1, b: 2, c: 1 };
    const result = countByToMap(collection, x => x);
    
    expect(result.get(1)).toBe(2);
    expect(result.get(2)).toBe(1);
  });

  it('should handle complex iteratee', () => {
    const collection = [
      { name: 'fred', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 }
    ];
    const result = countByToMap(collection, item => `${item.name}-${item.age}`);
    
    expect(result.get('fred-40')).toBe(2);
    expect(result.get('barney-36')).toBe(1);
  });
});
