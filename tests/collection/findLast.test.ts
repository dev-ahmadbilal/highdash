import { findLast } from '../../src/collection/findLast';

describe('findLast', () => {
  it('finds last element matching predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: false },
    ];

    expect(findLast(users, (o) => !o.active)).toEqual({ user: 'pebbles', active: false });
  });

  it('returns undefined when no match', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: true },
    ];

    expect(findLast(users, (o) => !o.active)).toBeUndefined();
  });

  it('works with object predicate', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
      { user: 'pebbles', age: 1, active: false },
    ];

    expect(findLast(users, { age: 1, active: false })).toEqual({ user: 'pebbles', age: 1, active: false });
  });

  it('works with property predicate', () => {
    const users = [
      { user: 'barney', active: false },
      { user: 'fred', active: true },
      { user: 'pebbles', active: false },
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

  it('works with object collections', () => {
    const users = {
      user1: { name: 'barney', active: true },
      user2: { name: 'fred', active: false },
      user3: { name: 'pebbles', active: false },
    };

    expect(findLast(users, (o) => !o.active)).toEqual({ name: 'pebbles', active: false });
  });

  it('works with object collections and object predicate', () => {
    const users = {
      user1: { name: 'barney', age: 36, active: false },
      user2: { name: 'fred', age: 40, active: true },
      user3: { name: 'pebbles', age: 1, active: false },
    };

    expect(findLast(users, { age: 1, active: false })).toEqual({ name: 'pebbles', age: 1, active: false });
  });

  it('works with object collections and property predicate', () => {
    const users = {
      user1: { name: 'barney', active: false },
      user2: { name: 'fred', active: true },
      user3: { name: 'pebbles', active: false },
    };

    expect(findLast(users, 'active')).toEqual({ name: 'pebbles', active: false });
  });

  it('handles empty object collection', () => {
    expect(findLast({}, (x) => x > 0)).toBeUndefined();
  });

  it('uses index parameter in predicate', () => {
    const numbers = [10, 20, 30, 40];

    expect(findLast(numbers, (value, index) => index === 2)).toBe(30);
    expect(findLast(numbers, (value, index) => index === 0)).toBe(10);
  });

  it('uses index parameter with object collections', () => {
    const obj = { a: 10, b: 20, c: 30, d: 40 };

    expect(findLast(obj, (value, index) => index === 2)).toBe(30);
    expect(findLast(obj, (value, index) => index === 0)).toBe(10);
  });

  it('uses collection parameter in predicate', () => {
    const numbers = [1, 2, 3, 4];

    expect(findLast(numbers, (value, index, collection) => collection.length === 4 && index === 3)).toBe(4);
  });

  it('handles primitive values', () => {
    const numbers = [1, 2, 3, 4, 5];

    expect(findLast(numbers, (n) => n % 2 === 0)).toBe(4);
    expect(findLast(numbers, (n) => n > 3)).toBe(5);
  });

  it('handles string arrays', () => {
    const words = ['apple', 'banana', 'cherry', 'date'];

    expect(findLast(words, (word) => word.length > 5)).toBe('cherry');
    expect(findLast(words, (word) => word.startsWith('d'))).toBe('date');
  });

  it('handles mixed types', () => {
    const mixed = [1, 'hello', true, null, undefined];

    expect(findLast(mixed, (item) => typeof item === 'string')).toBe('hello');
    expect(findLast(mixed, (item) => item === null)).toBe(null);
  });

  it('handles object predicate with multiple properties', () => {
    const users = [
      { name: 'john', age: 25, city: 'NYC' },
      { name: 'jane', age: 30, city: 'LA' },
      { name: 'bob', age: 25, city: 'NYC' },
    ];

    expect(findLast(users, { age: 25, city: 'NYC' })).toEqual({ name: 'bob', age: 25, city: 'NYC' });
  });

  it('handles property predicate with falsy values', () => {
    const items = [{ value: 0 }, { value: 1 }, { value: null }, { value: undefined }];

    // The property predicate finds the last falsy value, which is undefined
    expect(findLast(items, 'value')).toEqual({ value: undefined });
  });

  it('handles complex object predicate', () => {
    const data = [
      { id: 1, status: 'active', score: 85 },
      { id: 2, status: 'inactive', score: 90 },
      { id: 3, status: 'active', score: 75 },
      { id: 4, status: 'active', score: 95 },
    ];

    expect(findLast(data, { status: 'active', score: 95 })).toEqual({ id: 4, status: 'active', score: 95 });
  });

  it('handles edge case with single element array', () => {
    const single = [{ id: 1, active: true }];

    expect(findLast(single, (item) => item.active)).toEqual({ id: 1, active: true });
    expect(findLast(single, (item) => !item.active)).toBeUndefined();
  });

  it('handles edge case with single property object', () => {
    const single = { key1: { id: 1, active: true } };

    expect(findLast(single, (item) => item.active)).toEqual({ id: 1, active: true });
    expect(findLast(single, (item) => !item.active)).toBeUndefined();
  });

  it('handles predicate that returns truthy values', () => {
    const items = [0, 1, 2, 3, 4];

    expect(findLast(items, (n) => n)).toBe(4);
    expect(findLast(items, (n) => n > 2)).toBe(4);
  });

  it('handles predicate that returns falsy values', () => {
    const items = [1, 2, 3, 4, 5];

    expect(findLast(items, (n) => n > 10)).toBeUndefined();
    expect(findLast(items, (n) => n < 0)).toBeUndefined();
  });
});
