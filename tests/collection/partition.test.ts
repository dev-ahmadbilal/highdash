import { partition } from '../../src/collection/partition';

describe('partition', () => {
  it('should partition array by predicate function', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
      { user: 'pebbles', age: 1, active: false }
    ];
    const result = partition(users, o => o.active);
    expect(result[0]).toEqual([{ user: 'fred', age: 40, active: true }]);
    expect(result[1]).toEqual([
      { user: 'barney', age: 36, active: false },
      { user: 'pebbles', age: 1, active: false }
    ]);
  });

  it('should partition array by property', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = partition(numbers, n => n % 2 === 0);
    expect(result[0]).toEqual([2, 4]);
    expect(result[1]).toEqual([1, 3, 5]);
  });

  it('should handle empty array', () => {
    const result = partition([], x => x);
    expect(result).toEqual([[], []]);
  });

  it('should handle null/undefined', () => {
    expect(partition(null as any, x => x)).toEqual([[], []]);
    expect(partition(undefined as any, x => x)).toEqual([[], []]);
  });

  it('should handle object input', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = partition(obj, (value) => value % 2 === 0);
    expect(result[0]).toEqual([2]);
    expect(result[1]).toEqual([1, 3]);
  });
});
