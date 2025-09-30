import { matchesProperty } from '../../src/util/matchesProperty';

describe('matchesProperty', () => {
  it('should create function that matches property value', () => {
    const objects = [
      { a: { b: 2 } },
      { a: { b: 1 } }
    ];
    
    const matcher = matchesProperty('a.b', 2);
    expect(matcher(objects[0])).toBe(true);
    expect(matcher(objects[1])).toBe(false);
  });

  it('should work with simple property paths', () => {
    const matcher = matchesProperty('name', 'john');
    expect(matcher({ name: 'john' })).toBe(true);
    expect(matcher({ name: 'jane' })).toBe(false);
  });

  it('should work with array indices', () => {
    const matcher = matchesProperty('items.0', 'first');
    expect(matcher({ items: ['first', 'second'] })).toBe(true);
    expect(matcher({ items: ['second', 'first'] })).toBe(false);
  });

  it('should work with nested objects', () => {
    const matcher = matchesProperty('user.profile.age', 30);
    expect(matcher({ user: { profile: { age: 30 } } })).toBe(true);
    expect(matcher({ user: { profile: { age: 25 } } })).toBe(false);
  });

  it('should work with different value types', () => {
    const matcher1 = matchesProperty('active', true);
    const matcher2 = matchesProperty('count', 0);
    const matcher3 = matchesProperty('value', null);
    
    expect(matcher1({ active: true })).toBe(true);
    expect(matcher2({ count: 0 })).toBe(true);
    expect(matcher3({ value: null })).toBe(true);
  });

  it('should return false for non-existent properties', () => {
    const matcher = matchesProperty('x', 1);
    expect(matcher({ a: 1 })).toBe(false);
  });

  it('should return false for non-existent nested properties', () => {
    const matcher = matchesProperty('a.x', 1);
    expect(matcher({ a: { b: 1 } })).toBe(false);
  });

  it('should handle null and undefined objects', () => {
    const matcher = matchesProperty('name', 'test');
    expect(matcher(null)).toBe(false);
    expect(matcher(undefined)).toBe(false);
  });

  it('should handle non-object input', () => {
    const matcher = matchesProperty('name', 'test');
    expect(matcher('string')).toBe(false);
    expect(matcher(123)).toBe(false);
    expect(matcher(true)).toBe(false);
  });

  it('should work with empty property path', () => {
    const matcher = matchesProperty('', 'test');
    expect(matcher({})).toBe(false);
    expect(matcher({ a: 1 })).toBe(false);
  });

  it('should work with complex nested structures', () => {
    const matcher = matchesProperty('data.users.0.profile.name', 'john');
    const obj = {
      data: {
        users: [
          { profile: { name: 'john' } },
          { profile: { name: 'jane' } }
        ]
      }
    };
    expect(matcher(obj)).toBe(true);
  });
});
