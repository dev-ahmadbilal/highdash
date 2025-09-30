import { identity } from '../../src/util/identity';

describe('identity', () => {
  it('should return the first argument', () => {
    const object = { 'a': 1 };
    expect(identity(object)).toBe(object);
    expect(identity(42)).toBe(42);
    expect(identity('hello')).toBe('hello');
  });

  it('should handle null and undefined', () => {
    expect(identity(null)).toBeNull();
    expect(identity(undefined)).toBeUndefined();
  });

  it('should handle primitives', () => {
    expect(identity(true)).toBe(true);
    expect(identity(false)).toBe(false);
    expect(identity(0)).toBe(0);
    expect(identity('')).toBe('');
  });
});
