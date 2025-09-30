import { at } from '../../src/object/at';

describe('at', () => {
  it('should pick values at paths', () => {
    const object = { a: [{ b: { c: 3 } }, 4] };
    expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4]);
  });

  it('should handle simple paths', () => {
    const object = { a: 1, b: 2 };
    expect(at(object, ['a', 'b'])).toEqual([1, 2]);
  });

  it('should return undefined for non-existent paths', () => {
    const object = { a: 1 };
    expect(at(object, ['a', 'b', 'c'])).toEqual([1, undefined, undefined]);
  });

  it('should handle empty object', () => {
    expect(at({}, ['a'])).toEqual([undefined]);
  });

  it('should handle null/undefined', () => {
    expect(at(null, ['a'])).toEqual([]);
    expect(at(undefined, ['a'])).toEqual([]);
  });
});
