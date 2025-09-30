import { sortBy } from '../../src/array/sortBy';

describe('sortBy', () => {
  it('should sort array by iteratee', () => {
    const users = [
      { 'user': 'fred', 'age': 48 },
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred', 'age': 40 },
      { 'user': 'barney', 'age': 34 }
    ];

    const result = sortBy(users, 'user', 'age');
    expect(result).toEqual([
      { 'user': 'barney', 'age': 34 },
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred', 'age': 40 },
      { 'user': 'fred', 'age': 48 }
    ]);
  });

  it('should sort by function iteratee', () => {
    const users = [
      { 'user': 'fred', 'age': 48 },
      { 'user': 'barney', 'age': 36 }
    ];

    const result = sortBy(users, user => user.age);
    expect(result).toEqual([
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred', 'age': 48 }
    ]);
  });

  it('should sort by string property', () => {
    const users = [
      { 'user': 'fred', 'age': 48 },
      { 'user': 'barney', 'age': 36 }
    ];

    const result = sortBy(users, 'age');
    expect(result).toEqual([
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred', 'age': 48 }
    ]);
  });

  it('should handle empty array', () => {
    expect(sortBy([], 'age')).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(sortBy(null as any, 'age')).toEqual([]);
  });

  it('should handle object input', () => {
    const obj = { 'a': { 'value': 2 }, 'b': { 'value': 1 } };
    const result = sortBy(obj, 'value');
    expect(result).toEqual([{ 'value': 1 }, { 'value': 2 }]);
  });
});
