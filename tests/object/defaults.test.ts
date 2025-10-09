import { defaults } from '../../src/object/defaults';

describe('defaults', () => {
  it('should assign default values for undefined properties', () => {
    const object = { a: 1 };
    const result = defaults(object, { b: 2 }, { a: 3 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should not override existing values', () => {
    const object = { a: 1, b: 2 };
    const result = defaults(object, { a: 3, c: 4 });
    expect(result).toEqual({ a: 1, b: 2, c: 4 });
  });

  it('should handle multiple sources', () => {
    const object = {};
    const result = defaults(object, { a: 1 }, { b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle null and undefined sources', () => {
    const object = { a: 1 };
    const result = defaults(object, null, { b: 2 }, undefined);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should return original object if not an object', () => {
    expect(defaults(null, { a: 1 })).toBeNull();
    expect(defaults(undefined, { a: 1 })).toBeUndefined();
  });
});
