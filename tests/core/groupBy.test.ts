import { groupBy } from '../../src/core/groupBy';

describe('groupBy', () => {
  it('should group by iteratee function', () => {
    const result = groupBy([6.1, 4.2, 6.3], Math.floor);
    expect(result).toEqual({ '4': [4.2], '6': [6.1, 6.3] });
  });

  it('should group by property', () => {
    const result = groupBy(['one', 'two', 'three'], 'length');
    expect(result).toEqual({ '3': ['one', 'two'], '5': ['three'] });
  });

  it('should group objects by property', () => {
    const users = [
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 30 },
    ];
    const result = groupBy(users, 'user');
    expect(result).toEqual({
      fred: [
        { user: 'fred', age: 40 },
        { user: 'fred', age: 30 },
      ],
      barney: [{ user: 'barney', age: 36 }],
    });
  });

  it('should handle empty array', () => {
    expect(groupBy([], Math.floor)).toEqual({});
  });

  it('should handle null/undefined', () => {
    expect(groupBy(null as any, Math.floor)).toEqual({});
    expect(groupBy(undefined as any, Math.floor)).toEqual({});
  });

  it('should handle object input', () => {
    const obj = { a: 1, b: 2, c: 1 };
    const result = groupBy(obj, (value) => value);
    expect(result).toEqual({ '1': [1, 1], '2': [2] });
  });

  it('should handle complex path access', () => {
    const users = [
      { user: { profile: { id: 1 } }, name: 'John' },
      { user: { profile: { id: 2 } }, name: 'Jane' },
      { user: { profile: { id: 1 } }, name: 'Bob' },
    ];
    const result = groupBy(users, 'user.profile.id');
    expect(result).toEqual({
      '1': [
        { user: { profile: { id: 1 } }, name: 'John' },
        { user: { profile: { id: 1 } }, name: 'Bob' },
      ],
      '2': [{ user: { profile: { id: 2 } }, name: 'Jane' }],
    });
  });

  it('should handle array path access', () => {
    const users = [
      { items: [1, 2, 3], name: 'John' },
      { items: [4, 5, 6], name: 'Jane' },
      { items: [1, 2, 3], name: 'Bob' },
    ];
    const result = groupBy(users, 'items[0]');
    expect(result).toEqual({
      '1': [
        { items: [1, 2, 3], name: 'John' },
        { items: [1, 2, 3], name: 'Bob' },
      ],
      '4': [{ items: [4, 5, 6], name: 'Jane' }],
    });
  });

  it('should handle nested array path access', () => {
    const users = [
      { data: { items: [1, 2, 3] }, name: 'John' },
      { data: { items: [4, 5, 6] }, name: 'Jane' },
      { data: { items: [1, 2, 3] }, name: 'Bob' },
    ];
    const result = groupBy(users, 'data.items[0]');
    expect(result).toEqual({
      '1': [
        { data: { items: [1, 2, 3] }, name: 'John' },
        { data: { items: [1, 2, 3] }, name: 'Bob' },
      ],
      '4': [{ data: { items: [4, 5, 6] }, name: 'Jane' }],
    });
  });

  it('should handle undefined/null values in complex paths', () => {
    const users = [
      { user: { profile: { id: 1 } }, name: 'John' },
      { user: { profile: { id: undefined } }, name: 'Jane' },
      { user: { profile: { id: null } }, name: 'Bob' },
      { user: { profile: null }, name: 'Alice' },
      { user: null, name: 'Charlie' },
    ];
    const result = groupBy(users, 'user.profile.id');
    expect(result).toEqual({
      '1': [{ user: { profile: { id: 1 } }, name: 'John' }],
      undefined: [
        { user: { profile: { id: undefined } }, name: 'Jane' },
        { user: { profile: null }, name: 'Alice' },
        { user: null, name: 'Charlie' },
      ],
      null: [{ user: { profile: { id: null } }, name: 'Bob' }],
    });
  });

  it('should handle function iteratee with complex return values', () => {
    const users = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    const result = groupBy(users, (user) => (user.age > 25 ? 'adult' : 'young'));
    expect(result).toEqual({
      young: [
        { name: 'John', age: 25 },
        { name: 'Bob', age: 25 },
      ],
      adult: [{ name: 'Jane', age: 30 }],
    });
  });

  it('should handle empty object input', () => {
    const result = groupBy({}, 'name');
    expect(result).toEqual({});
  });

  it('should handle single item array', () => {
    const result = groupBy([{ name: 'John' }], 'name');
    expect(result).toEqual({ John: [{ name: 'John' }] });
  });
});
