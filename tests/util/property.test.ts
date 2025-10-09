import { property } from '../../src/util/property';

describe('property', () => {
  it('should create function that gets property value', () => {
    const objects = [{ a: { b: 2 } }, { a: { b: 1 } }];

    const getA = property('a');
    expect(getA(objects[0])).toEqual({ b: 2 });
    expect(getA(objects[1])).toEqual({ b: 1 });
  });

  it('should work with nested property paths', () => {
    const objects = [{ a: { b: { c: 3 } } }, { a: { b: { c: 1 } } }];

    const getC = property('a.b.c');
    expect(getC(objects[0])).toBe(3);
    expect(getC(objects[1])).toBe(1);
  });

  it('should return undefined for non-existent properties', () => {
    const getX = property('x');
    expect(getX({ a: 1 })).toBe(undefined);
  });

  it('should return undefined for non-existent nested properties', () => {
    const getX = property('a.x');
    expect(getX({ a: { b: 1 } })).toBe(undefined);
  });

  it('should work with array indices', () => {
    const objects = [{ items: [1, 2, 3] }, { items: [4, 5, 6] }];

    const getFirstItem = property('items.0');
    expect(getFirstItem(objects[0])).toBe(1);
    expect(getFirstItem(objects[1])).toBe(4);
  });

  it('should work with mixed property and array access', () => {
    const objects = [{ users: [{ name: 'john' }, { name: 'jane' }] }, { users: [{ name: 'bob' }, { name: 'alice' }] }];

    const getFirstName = property('users.0.name');
    expect(getFirstName(objects[0])).toBe('john');
    expect(getFirstName(objects[1])).toBe('bob');
  });

  it('should handle null and undefined objects', () => {
    const getName = property('name');
    expect(getName(null)).toBe(undefined);
    expect(getName(undefined)).toBe(undefined);
  });

  it('should handle non-object input', () => {
    const getName = property('name');
    expect(getName('string')).toBe(undefined);
    expect(getName(123)).toBe(undefined);
    expect(getName(true)).toBe(undefined);
  });

  it('should work with empty property path', () => {
    const getEmpty = property('');
    expect(getEmpty({})).toBe(undefined);
    expect(getEmpty({ a: 1 })).toBe(undefined);
  });

  it('should work with single character property', () => {
    const getA = property('a');
    expect(getA({ a: 1 })).toBe(1);
    expect(getA({ b: 2 })).toBe(undefined);
  });
});
