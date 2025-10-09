import { functions } from '../../src/object/functions';

describe('functions', () => {
  it('gets function property names', () => {
    const obj = {
      a: 1,
      b: () => {},
      c: 'hello',
      d: function () {},
    };
    const result = functions(obj);
    expect(result).toEqual(['b', 'd']);
  });

  it('handles empty object', () => {
    expect(functions({})).toEqual([]);
  });

  it('handles object with no functions', () => {
    expect(functions({ a: 1, b: 'hello', c: true })).toEqual([]);
  });

  it('handles null input', () => {
    expect(functions(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(functions(undefined)).toEqual([]);
  });

  it('handles non-object input', () => {
    expect(functions('string')).toEqual([]);
    expect(functions(123)).toEqual([]);
    expect(functions(true)).toEqual([]);
  });
});
