import { set } from '../../src/object/set';

describe('set', () => {
  it('should set nested property values', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    set(object, 'a[0].b.c', 4);
    expect(object.a[0].b.c).toBe(4);
  });

  it('should create nested objects and arrays', () => {
    const object = {};
    set(object, 'a[0].b.c', 5);
    expect(object).toEqual({ 'a': [{ 'b': { 'c': 5 } }] });
  });

  it('should handle array notation', () => {
    const object = {};
    set(object, 'a[1]', 2);
    expect(object).toEqual({ 'a': [undefined, 2] });
  });

  it('should handle string path', () => {
    const object = {};
    set(object, 'a.b.c', 1);
    expect(object).toEqual({ 'a': { 'b': { 'c': 1 } } });
  });

  it('should handle array path', () => {
    const object = {};
    set(object, ['a', 'b', 'c'], 1);
    expect(object).toEqual({ 'a': { 'b': { 'c': 1 } } });
  });

  it('should not modify null or undefined objects', () => {
    expect(set(null, 'a.b', 1)).toBeNull();
    expect(set(undefined, 'a.b', 1)).toBeUndefined();
  });
});
