import { stubObject } from '../../src/util/stubObject';

describe('stubObject', () => {
  it('should return empty object', () => {
    expect(stubObject()).toEqual({});
  });

  it('should return new empty object each time', () => {
    const obj1 = stubObject();
    const obj2 = stubObject();
    expect(obj1).not.toBe(obj2);
    expect(obj1).toEqual(obj2);
  });

  it('should return empty object regardless of arguments', () => {
    expect(stubObject(1, 2, 3)).toEqual({});
    expect(stubObject('hello')).toEqual({});
    expect(stubObject({ a: 1 })).toEqual({});
  });

  it('should return empty object with no arguments', () => {
    expect(stubObject()).toEqual({});
  });

  it('should return empty object with null arguments', () => {
    expect(stubObject(null)).toEqual({});
  });

  it('should return empty object with undefined arguments', () => {
    expect(stubObject(undefined)).toEqual({});
  });

  it('should return empty object with boolean arguments', () => {
    expect(stubObject(true)).toEqual({});
    expect(stubObject(false)).toEqual({});
  });

  it('should return empty object with function arguments', () => {
    expect(stubObject(() => {})).toEqual({});
  });

  it('should return empty object with object arguments', () => {
    expect(stubObject({})).toEqual({});
    expect(stubObject({ a: 1 })).toEqual({});
  });

  it('should return empty object with array arguments', () => {
    expect(stubObject([])).toEqual({});
    expect(stubObject([1, 2, 3])).toEqual({});
  });

  it('should return empty object with complex arguments', () => {
    expect(stubObject({ a: { b: { c: 1 } } })).toEqual({});
    expect(stubObject([1, 2, { a: 1 }])).toEqual({});
  });
});
