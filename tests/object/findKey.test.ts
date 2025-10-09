import { findKey } from '../../src/object/findKey.js';

describe('findKey', () => {
  it('should find key with function predicate', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findKey(users, (o) => o.age < 40);
    expect(result).toBe('barney');
  });

  it('should find key with string predicate', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findKey(users, 'active');
    expect(result).toBe('barney');
  });

  it('should return undefined if no match found', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findKey(users, (o) => o.age > 100);
    expect(result).toBeUndefined();
  });

  it('should return undefined for null/undefined object', () => {
    expect(findKey(null as any, 'active')).toBeUndefined();
    expect(findKey(undefined as any, 'active')).toBeUndefined();
  });

  it('should return undefined for non-object', () => {
    expect(findKey('string' as any, 'active')).toBeUndefined();
    expect(findKey(123 as any, 'active')).toBeUndefined();
  });

  it('should handle empty object', () => {
    const result = findKey({}, 'active');
    expect(result).toBeUndefined();
  });

  it('should pass correct arguments to predicate', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
    };

    const predicate = jest.fn().mockReturnValue(true);
    findKey(users, predicate);

    expect(predicate).toHaveBeenCalledWith({ age: 36, active: true }, 'barney', users);
    expect(predicate).toHaveBeenCalledTimes(1);
  });

  it('should find first matching key', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true },
    };

    const result = findKey(users, (o) => o.active);
    expect(result).toBe('barney'); // First match, not 'pebbles'
  });
});
