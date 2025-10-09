import { findLastKey } from '../../src/object/findLastKey.js';

describe('findLastKey', () => {
  it('should find last key with function predicate', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findLastKey(users, (o) => o.age < 40);
    expect(result).toBe('pebbles');
  });

  it('should find last key with string predicate', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findLastKey(users, 'active');
    expect(result).toBe('pebbles');
  });

  it('should return undefined if no match found', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findLastKey(users, (o) => o.age > 100);
    expect(result).toBeUndefined();
  });

  it('should return undefined for null/undefined object', () => {
    expect(findLastKey(null as any, 'active')).toBeUndefined();
    expect(findLastKey(undefined as any, 'active')).toBeUndefined();
  });

  it('should return undefined for non-object', () => {
    expect(findLastKey('string' as any, 'active')).toBeUndefined();
    expect(findLastKey(123 as any, 'active')).toBeUndefined();
  });

  it('should handle empty object', () => {
    const result = findLastKey({}, 'active');
    expect(result).toBeUndefined();
  });

  it('should pass correct arguments to predicate', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
    };

    const predicate = jest.fn().mockReturnValue(true);
    findLastKey(users, predicate);

    expect(predicate).toHaveBeenCalledWith({ age: 40, active: false }, 'fred', users);
    expect(predicate).toHaveBeenCalledTimes(1);
  });

  it('should find last matching key', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findLastKey(users, (o) => o.active);
    expect(result).toBe('pebbles'); // Last match, not 'barney'
  });

  it('should iterate in reverse order', () => {
    const users = {
      a: { age: 1 },
      b: { age: 2 },
      c: { age: 3 },
    };

    const predicate = jest.fn().mockReturnValue(false);
    findLastKey(users, predicate);

    expect(predicate).toHaveBeenCalledWith({ age: 3 }, 'c', users);
    expect(predicate).toHaveBeenCalledWith({ age: 2 }, 'b', users);
    expect(predicate).toHaveBeenCalledWith({ age: 1 }, 'a', users);
  });
});
