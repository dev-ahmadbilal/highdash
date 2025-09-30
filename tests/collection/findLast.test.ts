import { findLast } from '../../src/collection/findLast';

describe('findLast', () => {
  it('finds last element matching predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: false }
    ];
    
    expect(findLast(users, (o) => !o.active)).toEqual({ user: 'pebbles', active: false });
  });

  it('returns undefined when no match', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: true }
    ];
    
    expect(findLast(users, (o) => !o.active)).toBeUndefined();
  });

  it('works with object predicate', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
      { user: 'pebbles', age: 1, active: false }
    ];
    
    expect(findLast(users, { age: 1, active: false })).toEqual({ user: 'pebbles', age: 1, active: false });
  });

  it('works with property predicate', () => {
    const users = [
      { user: 'barney', active: false },
      { user: 'fred', active: true },
      { user: 'pebbles', active: false }
    ];
    
    expect(findLast(users, 'active')).toEqual({ user: 'pebbles', active: false });
  });

  it('handles empty array', () => {
    expect(findLast([], (x) => x > 0)).toBeUndefined();
  });

  it('handles null input', () => {
    expect(findLast(null, (x) => x > 0)).toBeUndefined();
  });

  it('handles undefined input', () => {
    expect(findLast(undefined, (x) => x > 0)).toBeUndefined();
  });
});
