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
      { user: 'fred', age: 30 }
    ];
    const result = groupBy(users, 'user');
    expect(result).toEqual({
      'fred': [{ user: 'fred', age: 40 }, { user: 'fred', age: 30 }],
      'barney': [{ user: 'barney', age: 36 }]
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
});
