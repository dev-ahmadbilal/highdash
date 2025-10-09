import { mapValues } from '../../src/collection/mapValues';

describe('mapValues', () => {
  it('should map values with function', () => {
    const users = {
      fred: { user: 'fred', age: 40 },
      pebbles: { user: 'pebbles', age: 1 },
    };
    const result = mapValues(users, (o) => o.age);
    expect(result).toEqual({ fred: 40, pebbles: 1 });
  });

  it('should map values with function that uses key', () => {
    const obj = { a: 1, b: 2 };
    const result = mapValues(obj, (value, key) => `${key}:${value}`);
    expect(result).toEqual({ a: 'a:1', b: 'b:2' });
  });

  it('should handle empty object', () => {
    expect(mapValues({}, (x) => x)).toEqual({});
  });

  it('should handle null/undefined', () => {
    expect(mapValues(null as any, (x) => x)).toEqual({});
    expect(mapValues(undefined as any, (x) => x)).toEqual({});
  });

  it('should handle non-object', () => {
    expect(mapValues('string' as any, (x) => x)).toEqual({});
  });
});
