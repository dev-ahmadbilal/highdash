import { orderBy } from '../../src/collection/orderBy';

describe('orderBy', () => {
  it('should sort by multiple iteratees with orders', () => {
    const users = [
      { 'user': 'fred', 'age': 48 },
      { 'user': 'barney', 'age': 34 },
      { 'user': 'fred', 'age': 40 },
      { 'user': 'barney', 'age': 36 }
    ];

    const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);
    expect(result).toEqual([
      { 'user': 'barney', 'age': 36 },
      { 'user': 'barney', 'age': 34 },
      { 'user': 'fred', 'age': 48 },
      { 'user': 'fred', 'age': 40 }
    ]);
  });

  it('should sort by single iteratee', () => {
    const users = [
      { 'user': 'fred', 'age': 48 },
      { 'user': 'barney', 'age': 34 }
    ];

    const result = orderBy(users, 'age');
    expect(result).toEqual([
      { 'user': 'barney', 'age': 34 },
      { 'user': 'fred', 'age': 48 }
    ]);
  });

  it('should sort by function iteratee', () => {
    const users = [
      { 'user': 'fred', 'age': 48 },
      { 'user': 'barney', 'age': 34 }
    ];

    const result = orderBy(users, user => user.age);
    expect(result).toEqual([
      { 'user': 'barney', 'age': 34 },
      { 'user': 'fred', 'age': 48 }
    ]);
  });

  it('should handle empty array', () => {
    expect(orderBy([], 'age')).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(orderBy(null as any, 'age')).toEqual([]);
  });

  it('should handle object input', () => {
    const obj = { 'a': { 'value': 2 }, 'b': { 'value': 1 } };
    const result = orderBy(obj, 'value');
    expect(result).toEqual([{ 'value': 1 }, { 'value': 2 }]);
  });

  it('should handle no iteratees', () => {
    const arr = [3, 1, 2];
    expect(orderBy(arr)).toEqual([3, 1, 2]);
  });
});
