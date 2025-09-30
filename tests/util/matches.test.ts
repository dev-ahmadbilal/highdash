import { matches } from '../../src/util/matches';

describe('matches', () => {
  it('should create function that matches object properties', () => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'pebbles', age: 1, active: true }
    ];
    
    const matcher = matches({ age: 36, active: true });
    expect(matcher(users[0])).toBe(true);
    expect(matcher(users[1])).toBe(false);
    expect(matcher(users[2])).toBe(false);
  });

  it('should work with nested objects', () => {
    const objects = [
      { a: { b: 2 } },
      { a: { b: 1 } },
      { a: { c: 2 } }
    ];
    
    const matcher = matches({ a: { b: 2 } });
    expect(matcher(objects[0])).toBe(true);
    expect(matcher(objects[1])).toBe(false);
    expect(matcher(objects[2])).toBe(false);
  });

  it('should work with arrays', () => {
    const objects = [
      { tags: ['red', 'blue'] },
      { tags: ['red', 'green'] },
      { tags: ['blue'] }
    ];
    
    const matcher = matches({ tags: ['red', 'blue'] });
    expect(matcher(objects[0])).toBe(true);
    expect(matcher(objects[1])).toBe(false);
    expect(matcher(objects[2])).toBe(false);
  });

  it('should work with primitive values', () => {
    const matcher = matches({ name: 'john', age: 30 });
    expect(matcher({ name: 'john', age: 30 })).toBe(true);
    expect(matcher({ name: 'jane', age: 30 })).toBe(false);
    expect(matcher({ name: 'john', age: 25 })).toBe(false);
  });

  it('should work with boolean values', () => {
    const matcher = matches({ active: true });
    expect(matcher({ active: true })).toBe(true);
    expect(matcher({ active: false })).toBe(false);
    expect(matcher({})).toBe(false);
  });

  it('should work with null and undefined values', () => {
    const matcher = matches({ value: null });
    expect(matcher({ value: null })).toBe(true);
    expect(matcher({ value: undefined })).toBe(false);
    expect(matcher({})).toBe(false);
  });

  it('should work with empty object', () => {
    const matcher = matches({});
    expect(matcher({})).toBe(true);
    expect(matcher({ a: 1 })).toBe(true);
    expect(matcher(null)).toBe(false);
  });

  it('should handle non-object input', () => {
    const matcher = matches({ a: 1 });
    expect(matcher(null)).toBe(false);
    expect(matcher(undefined)).toBe(false);
    expect(matcher('string')).toBe(false);
    expect(matcher(123)).toBe(false);
  });
});
