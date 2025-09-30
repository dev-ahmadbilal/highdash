import { iteratee } from '../../src/util/iteratee';

describe('iteratee', () => {
  it('should return function as is when iteratee is function', () => {
    const fn = (x: number) => x * 2;
    const result = iteratee(fn);
    expect(result(5)).toBe(10);
  });

  it('should create property getter when iteratee is string', () => {
    const getter = iteratee('name');
    expect(getter({ name: 'john' })).toBe('john');
    expect(getter({ name: 'jane' })).toBe('jane');
  });

  it('should create property getter for nested paths', () => {
    const getter = iteratee('user.name');
    expect(getter({ user: { name: 'john' } })).toBe('john');
  });

  it('should create property getter for array indices', () => {
    const getter = iteratee('items.0');
    expect(getter({ items: ['first', 'second'] })).toBe('first');
  });

  it('should create matches predicate when iteratee is object', () => {
    const matcher = iteratee({ age: 30, active: true });
    expect(matcher({ age: 30, active: true })).toBe(true);
    expect(matcher({ age: 25, active: true })).toBe(false);
  });

  it('should create matches predicate for nested objects', () => {
    const matcher = iteratee({ user: { age: 30 } });
    expect(matcher({ user: { age: 30 } })).toBe(true);
    expect(matcher({ user: { age: 25 } })).toBe(false);
  });

  it('should create equality predicate when iteratee is primitive', () => {
    const matcher = iteratee(42);
    expect(matcher(42)).toBe(true);
    expect(matcher(43)).toBe(false);
  });

  it('should create equality predicate for string', () => {
    const matcher = iteratee('hello');
    expect(matcher('hello')).toBe(true);
    expect(matcher('world')).toBe(false);
  });

  it('should create equality predicate for boolean', () => {
    const matcher = iteratee(true);
    expect(matcher(true)).toBe(true);
    expect(matcher(false)).toBe(false);
  });

  it('should create equality predicate for null', () => {
    const matcher = iteratee(null);
    expect(matcher(null)).toBe(true);
    expect(matcher(undefined)).toBe(false);
  });

  it('should create equality predicate for undefined', () => {
    const matcher = iteratee(undefined);
    expect(matcher(undefined)).toBe(true);
    expect(matcher(null)).toBe(false);
  });

  it('should handle complex nested object matching', () => {
    const matcher = iteratee({ 
      user: { 
        profile: { 
          name: 'john',
          age: 30 
        } 
      } 
    });
    
    const obj = {
      user: {
        profile: {
          name: 'john',
          age: 30
        }
      }
    };
    
    expect(matcher(obj)).toBe(true);
  });

  it('should handle array matching', () => {
    const matcher = iteratee({ tags: ['red', 'blue'] });
    expect(matcher({ tags: ['red', 'blue'] })).toBe(true);
    expect(matcher({ tags: ['red', 'green'] })).toBe(false);
  });

  it('should handle mixed type matching', () => {
    const matcher = iteratee({ 
      name: 'john',
      age: 30,
      active: true,
      tags: ['red', 'blue']
    });
    
    const obj = {
      name: 'john',
      age: 30,
      active: true,
      tags: ['red', 'blue']
    };
    
    expect(matcher(obj)).toBe(true);
  });
});
