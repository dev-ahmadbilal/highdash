import { method } from '../../src/util/method';

describe('method', () => {
  it('should create function that invokes method on object', () => {
    const objects = [{ a: { b: 2 } }, { a: { b: 1 } }];

    const getB = method('a.b');
    expect(getB(objects[0])).toBe(2);
    expect(getB(objects[1])).toBe(1);
  });

  it('should work with simple property paths', () => {
    const getName = method('name');
    expect(getName({ name: 'john' })).toBe('john');
    expect(getName({ name: 'jane' })).toBe('jane');
  });

  it('should work with array indices', () => {
    const getFirst = method('items.0');
    expect(getFirst({ items: ['first', 'second'] })).toBe('first');
    expect(getFirst({ items: ['second', 'first'] })).toBe('second');
  });

  it('should work with nested objects', () => {
    const getAge = method('user.profile.age');
    expect(getAge({ user: { profile: { age: 30 } } })).toBe(30);
    expect(getAge({ user: { profile: { age: 25 } } })).toBe(25);
  });

  it('should work with different value types', () => {
    const getActive = method('active');
    const getCount = method('count');
    const getValue = method('value');

    expect(getActive({ active: true })).toBe(true);
    expect(getCount({ count: 0 })).toBe(0);
    expect(getValue({ value: null })).toBe(null);
  });

  it('should return undefined for non-existent properties', () => {
    const getX = method('x');
    expect(getX({ a: 1 })).toBe(undefined);
  });

  it('should return undefined for non-existent nested properties', () => {
    const getX = method('a.x');
    expect(getX({ a: { b: 1 } })).toBe(undefined);
  });

  it('should handle null and undefined objects', () => {
    const getName = method('name');
    expect(getName(null)).toBe(undefined);
    expect(getName(undefined)).toBe(undefined);
  });

  it('should handle non-object input', () => {
    const getName = method('name');
    expect(getName('string')).toBe(undefined);
    expect(getName(123)).toBe(undefined);
    expect(getName(true)).toBe(undefined);
  });

  it('should work with empty property path', () => {
    const getEmpty = method('');
    expect(getEmpty({})).toBe(undefined);
    expect(getEmpty({ a: 1 })).toBe(undefined);
  });

  it('should work with complex nested structures', () => {
    const getName = method('data.users.0.profile.name');
    const obj = {
      data: {
        users: [{ profile: { name: 'john' } }, { profile: { name: 'jane' } }],
      },
    };
    expect(getName(obj)).toBe('john');
  });

  it('should work with functions as values', () => {
    const getFn = method('fn');
    const obj = { fn: () => 'hello' };
    expect(getFn(obj)).toBe(obj.fn);
  });
});
