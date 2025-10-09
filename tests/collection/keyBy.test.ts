import { keyBy } from '../../src/collection/keyBy';

describe('keyBy', () => {
  it('should create object with keys from iteratee function', () => {
    const array = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 },
    ];
    const result = keyBy(array, 'dir');
    expect(result).toEqual({
      left: { dir: 'left', code: 97 },
      right: { dir: 'right', code: 100 },
    });
  });

  it('should create object with keys from property', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    const result = keyBy(array, 'id');
    expect(result).toEqual({
      '1': { id: 1, name: 'John' },
      '2': { id: 2, name: 'Jane' },
    });
  });

  it('should handle empty array', () => {
    expect(keyBy([], 'id')).toEqual({});
  });

  it('should handle null/undefined', () => {
    expect(keyBy(null as any, 'id')).toEqual({});
    expect(keyBy(undefined as any, 'id')).toEqual({});
  });

  it('should handle object input', () => {
    const obj = { a: { id: 1 }, b: { id: 2 } };
    const result = keyBy(obj, 'id');
    expect(result).toEqual({ '1': { id: 1 }, '2': { id: 2 } });
  });

  it('should work with function iteratee', () => {
    const array = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    const result = keyBy(array, (item) => item.name.toUpperCase());
    expect(result).toEqual({
      JOHN: { name: 'John', age: 25 },
      JANE: { name: 'Jane', age: 30 },
    });
  });

  it('should work with function iteratee returning numbers', () => {
    const array = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b' },
    ];
    const result = keyBy(array, (item) => item.id * 10);
    expect(result).toEqual({
      '10': { id: 1, value: 'a' },
      '20': { id: 2, value: 'b' },
    });
  });

  it('should work with function iteratee returning booleans', () => {
    const array = [
      { active: true, name: 'John' },
      { active: false, name: 'Jane' },
    ];
    const result = keyBy(array, (item) => item.active);
    expect(result).toEqual({
      true: { active: true, name: 'John' },
      false: { active: false, name: 'Jane' },
    });
  });

  it('should handle complex path access', () => {
    const array = [
      { user: { profile: { id: 1 } }, name: 'John' },
      { user: { profile: { id: 2 } }, name: 'Jane' },
    ];
    const result = keyBy(array, 'user.profile.id');
    expect(result).toEqual({
      '1': { user: { profile: { id: 1 } }, name: 'John' },
      '2': { user: { profile: { id: 2 } }, name: 'Jane' },
    });
  });

  it('should handle array path access', () => {
    const array = [
      { items: [1, 2, 3], name: 'John' },
      { items: [4, 5, 6], name: 'Jane' },
    ];
    const result = keyBy(array, 'items[0]');
    expect(result).toEqual({
      '1': { items: [1, 2, 3], name: 'John' },
      '4': { items: [4, 5, 6], name: 'Jane' },
    });
  });

  it('should handle undefined/null values in items', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: undefined, name: 'Jane' },
      { id: null, name: 'Bob' },
    ];
    const result = keyBy(array, 'id');
    expect(result).toEqual({
      '1': { id: 1, name: 'John' },
      undefined: { id: undefined, name: 'Jane' },
      null: { id: null, name: 'Bob' },
    });
  });

  it('should handle duplicate keys (last wins)', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 1, name: 'Jane' },
      { id: 2, name: 'Bob' },
    ];
    const result = keyBy(array, 'id');
    expect(result).toEqual({
      '1': { id: 1, name: 'Jane' }, // Last one wins
      '2': { id: 2, name: 'Bob' },
    });
  });

  it('should handle function iteratee with undefined/null return', () => {
    const array = [
      { name: 'John', value: 1 },
      { name: 'Jane', value: null },
      { name: 'Bob', value: undefined },
    ];
    const result = keyBy(array, (item) => item.value);
    expect(result).toEqual({
      '1': { name: 'John', value: 1 },
      null: { name: 'Jane', value: null },
      undefined: { name: 'Bob', value: undefined },
    });
  });

  it('should handle empty object input', () => {
    expect(keyBy({}, 'id')).toEqual({});
  });

  it('should handle single item array', () => {
    const array = [{ id: 1, name: 'John' }];
    const result = keyBy(array, 'id');
    expect(result).toEqual({
      '1': { id: 1, name: 'John' },
    });
  });

  it('should handle function iteratee with complex return values', () => {
    const array = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    const result = keyBy(array, (item) => `${item.x}-${item.y}`);
    expect(result).toEqual({
      '1-2': { x: 1, y: 2 },
      '3-4': { x: 3, y: 4 },
    });
  });
});
