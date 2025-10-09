import { isMatch } from '../../src/lang/isMatch.js';

describe('isMatch', () => {
  it('should return true for identical objects', () => {
    const object = { a: 1, b: 2 };
    const source = { a: 1, b: 2 };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return true for partial matches', () => {
    const object = { a: 1, b: 2, c: 3 };
    const source = { b: 2 };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return false for non-matching values', () => {
    const object = { a: 1, b: 2 };
    const source = { b: 1 };
    expect(isMatch(object, source)).toBe(false);
  });

  it('should return false for missing properties', () => {
    const object = { a: 1 };
    const source = { b: 2 };
    expect(isMatch(object, source)).toBe(false);
  });

  it('should work with nested objects', () => {
    const object = { a: { b: { c: 1 } } };
    const source = { a: { b: { c: 1 } } };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should work with partial nested matches', () => {
    const object = { a: { b: { c: 1, d: 2 } } };
    const source = { a: { b: { c: 1 } } };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return false for non-matching nested values', () => {
    const object = { a: { b: { c: 1 } } };
    const source = { a: { b: { c: 2 } } };
    expect(isMatch(object, source)).toBe(false);
  });

  it('should work with arrays', () => {
    const object = { a: [1, 2, 3] };
    const source = { a: [1, 2, 3] };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return false for non-matching arrays', () => {
    const object = { a: [1, 2, 3] };
    const source = { a: [1, 2, 4] };
    expect(isMatch(object, source)).toBe(false);
  });

  it('should work with mixed types', () => {
    const object = { a: 1, b: 'hello', c: true, d: null };
    const source = { a: 1, b: 'hello' };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return false for type mismatches', () => {
    const object = { a: 1 };
    const source = { a: '1' };
    expect(isMatch(object, source)).toBe(false);
  });

  it('should handle null values', () => {
    const object = { a: null };
    const source = { a: null };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should handle undefined values', () => {
    const object = { a: undefined };
    const source = { a: undefined };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return false for null vs undefined', () => {
    const object = { a: null };
    const source = { a: undefined };
    expect(isMatch(object, source)).toBe(false);
  });

  it('should handle empty objects', () => {
    const object = {};
    const source = {};
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return true for empty source', () => {
    const object = { a: 1, b: 2 };
    const source = {};
    expect(isMatch(object, source)).toBe(true);
  });

  it('should handle non-object inputs', () => {
    expect(isMatch(1, 1)).toBe(true);
    expect(isMatch(1, 2)).toBe(false);
    expect(isMatch('hello', 'hello')).toBe(true);
    expect(isMatch('hello', 'world')).toBe(false);
    expect(isMatch(null, null)).toBe(true);
    expect(isMatch(null, {})).toBe(false);
    expect(isMatch({}, null)).toBe(false);
  });

  it('should work with complex nested structures', () => {
    const object = {
      user: {
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'New York',
          coordinates: [40.7128, -74.006],
        },
        hobbies: ['reading', 'swimming'],
      },
      active: true,
    };

    const source = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
        },
      },
    };

    expect(isMatch(object, source)).toBe(true);
  });

  it('should return false for complex non-matching structures', () => {
    const object = {
      user: {
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'New York',
        },
      },
    };

    const source = {
      user: {
        name: 'Jane',
        address: {
          city: 'New York',
        },
      },
    };

    expect(isMatch(object, source)).toBe(false);
  });

  it('should handle symbol keys', () => {
    const sym = Symbol('key');
    const object = { [sym]: 'value', a: 1 };
    const source = { [sym]: 'value' };
    expect(isMatch(object, source)).toBe(true);
  });

  it('should return false for non-matching symbol values', () => {
    const sym = Symbol('key');
    const object = { [sym]: 'value', a: 1 };
    const source = { [sym]: 'other' };
    expect(isMatch(object, source)).toBe(false);
  });
});
