import { propertyOf } from '../../src/util/propertyOf';

describe('propertyOf', () => {
  it('should create function that gets property value from object', () => {
    const objects = {
      a: { b: 2 },
      c: { b: 1 }
    };
    
    const getB = propertyOf(objects, 'a.b');
    expect(getB()).toBe(2);
  });

  it('should work with simple property paths', () => {
    const obj = { name: 'john' };
    const getName = propertyOf(obj, 'name');
    expect(getName()).toBe('john');
  });

  it('should work with array indices', () => {
    const obj = { items: ['first', 'second'] };
    const getFirst = propertyOf(obj, 'items.0');
    expect(getFirst()).toBe('first');
  });

  it('should work with nested objects', () => {
    const obj = { user: { profile: { age: 30 } } };
    const getAge = propertyOf(obj, 'user.profile.age');
    expect(getAge()).toBe(30);
  });

  it('should work with different value types', () => {
    const obj = { active: true, count: 0, value: null };
    const getActive = propertyOf(obj, 'active');
    const getCount = propertyOf(obj, 'count');
    const getValue = propertyOf(obj, 'value');
    
    expect(getActive()).toBe(true);
    expect(getCount()).toBe(0);
    expect(getValue()).toBe(null);
  });

  it('should return undefined for non-existent properties', () => {
    const obj = { a: 1 };
    const getX = propertyOf(obj, 'x');
    expect(getX()).toBe(undefined);
  });

  it('should return undefined for non-existent nested properties', () => {
    const obj = { a: { b: 1 } };
    const getX = propertyOf(obj, 'a.x');
    expect(getX()).toBe(undefined);
  });

  it('should handle null and undefined objects', () => {
    const getName = propertyOf(null, 'name');
    const getName2 = propertyOf(undefined, 'name');
    expect(getName()).toBe(undefined);
    expect(getName2()).toBe(undefined);
  });

  it('should handle non-object input', () => {
    const getName = propertyOf('string', 'name');
    const getName2 = propertyOf(123, 'name');
    const getName3 = propertyOf(true, 'name');
    expect(getName()).toBe(undefined);
    expect(getName2()).toBe(undefined);
    expect(getName3()).toBe(undefined);
  });

  it('should work with empty property path', () => {
    const obj = { a: 1 };
    const getEmpty = propertyOf(obj, '');
    expect(getEmpty()).toBe(undefined);
  });

  it('should work with complex nested structures', () => {
    const obj = {
      data: {
        users: [
          { profile: { name: 'john' } },
          { profile: { name: 'jane' } }
        ]
      }
    };
    const getName = propertyOf(obj, 'data.users.0.profile.name');
    expect(getName()).toBe('john');
  });

  it('should work with functions as values', () => {
    const obj = { fn: () => 'hello' };
    const getFn = propertyOf(obj, 'fn');
    expect(getFn()).toBe(obj.fn);
  });
});
