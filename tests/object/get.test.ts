import { get } from '../../src/object/get';

describe('get', () => {
  it('should get nested property values', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a[0].b.c')).toBe(3);
    expect(get(object, ['a', '0', 'b', 'c'])).toBe(3);
  });

  it('should return default value for undefined paths', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a.b.c', 'default')).toBe('default');
    expect(get(object, 'x.y.z', 'default')).toBe('default');
  });

  it('should handle array notation', () => {
    const object = { 'a': [1, 2, 3] };
    expect(get(object, 'a[1]')).toBe(2);
    expect(get(object, 'a[5]', 'default')).toBe('default');
  });

  it('should handle null and undefined objects', () => {
    expect(get(null, 'a.b')).toBeUndefined();
    expect(get(undefined, 'a.b', 'default')).toBe('default');
    expect(get({}, 'a.b', 'default')).toBe('default');
  });

  it('should handle empty path', () => {
    const object = { 'a': 1 };
    expect(get(object, '')).toBe(object);
  });
});
