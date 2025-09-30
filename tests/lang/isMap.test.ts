import { isMap } from '../../src/lang/isMap';

describe('isMap', () => {
  it('should return true for Map objects', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Map([['a', 1]]))).toBe(true);
  });

  it('should return false for non-Map objects', () => {
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap({})).toBe(false);
    expect(isMap([])).toBe(false);
    expect(isMap('abc')).toBe(false);
    expect(isMap(1)).toBe(false);
    expect(isMap(true)).toBe(false);
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
    expect(isMap(() => {})).toBe(false);
  });
});
