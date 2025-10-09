import { countBy } from '../../src/collection/countBy';

describe('countBy', () => {
  it('should count by function iteratee', () => {
    expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': 1, '6': 2 });
  });

  it('should count by string property', () => {
    expect(countBy(['one', 'two', 'three'], 'length')).toEqual({ '3': 2, '5': 1 });
  });

  it('should handle empty array', () => {
    expect(countBy([], 'length')).toEqual({});
  });

  it('should handle non-array input', () => {
    expect(countBy(null as any, 'length')).toEqual({});
  });

  it('should handle object input', () => {
    const obj = { a: { value: 1 }, b: { value: 2 }, c: { value: 1 } };
    expect(countBy(obj, 'value')).toEqual({ '1': 2, '2': 1 });
  });

  it('should handle complex objects', () => {
    const users = [
      { user: 'fred', active: false },
      { user: 'barney', active: true },
      { user: 'pebbles', active: false },
    ];
    expect(countBy(users, 'active')).toEqual({ false: 2, true: 1 });
  });
});
