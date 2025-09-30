import { toPath } from '../../src/util/toPath';

describe('toPath', () => {
  it('should convert string path to array', () => {
    expect(toPath('a.b.c')).toEqual(['a', 'b', 'c']);
  });

  it('should convert string with array notation to array', () => {
    expect(toPath('a[0].b')).toEqual(['a', '0', 'b']);
  });

  it('should convert string with mixed notation to array', () => {
    expect(toPath('a[0].b[1].c')).toEqual(['a', '0', 'b', '1', 'c']);
  });

  it('should convert string with nested array notation to array', () => {
    expect(toPath('a[0][1].b')).toEqual(['a', '0', '1', 'b']);
  });

  it('should convert string with only array notation to array', () => {
    expect(toPath('[0][1][2]')).toEqual(['0', '1', '2']);
  });

  it('should convert string with only dot notation to array', () => {
    expect(toPath('a.b.c')).toEqual(['a', 'b', 'c']);
  });

  it('should convert string with single property to array', () => {
    expect(toPath('a')).toEqual(['a']);
  });

  it('should convert empty string to empty array', () => {
    expect(toPath('')).toEqual([]);
  });

  it('should return array as is', () => {
    const path = ['a', 'b', 'c'];
    expect(toPath(path)).toBe(path);
  });

  it('should return array with mixed types as is', () => {
    const path = ['a', 0, 'b', 1, 'c'];
    expect(toPath(path)).toBe(path);
  });

  it('should handle complex nested paths', () => {
    expect(toPath('users[0].profile.name')).toEqual(['users', '0', 'profile', 'name']);
  });

  it('should handle paths with special characters', () => {
    expect(toPath('a-b.c-d')).toEqual(['a-b', 'c-d']);
  });

  it('should handle paths with numbers', () => {
    expect(toPath('a1.b2.c3')).toEqual(['a1', 'b2', 'c3']);
  });

  it('should handle paths with underscores', () => {
    expect(toPath('a_b.c_d')).toEqual(['a_b', 'c_d']);
  });

  it('should handle null and undefined', () => {
    expect(toPath(null)).toEqual([]);
    expect(toPath(undefined)).toEqual([]);
  });

  it('should handle non-string, non-array input', () => {
    expect(toPath(123)).toEqual([]);
    expect(toPath(true)).toEqual([]);
    expect(toPath({})).toEqual([]);
  });
});
