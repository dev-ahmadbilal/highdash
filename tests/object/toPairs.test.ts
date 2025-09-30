import { toPairs } from '../../src/object/toPairs';

describe('toPairs', () => {
  it('converts object to key-value pairs', () => {
    expect(toPairs({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]]);
  });

  it('handles empty object', () => {
    expect(toPairs({})).toEqual([]);
  });

  it('handles object with different value types', () => {
    const obj = { a: 1, b: 'hello', c: true, d: null };
    const result = toPairs(obj);
    expect(result).toEqual([['a', 1], ['b', 'hello'], ['c', true], ['d', null]]);
  });

  it('handles object with nested objects', () => {
    const obj = { a: { b: 1 }, c: { d: 2 } };
    const result = toPairs(obj);
    expect(result).toEqual([['a', { b: 1 }], ['c', { d: 2 }]]);
  });

  it('handles object with arrays', () => {
    const obj = { a: [1, 2], b: [3, 4] };
    const result = toPairs(obj);
    expect(result).toEqual([['a', [1, 2]], ['b', [3, 4]]]);
  });

  it('handles object with functions', () => {
    const fn1 = () => 'hello';
    const fn2 = () => 'world';
    const obj = { a: fn1, b: fn2 };
    const result = toPairs(obj);
    expect(result).toEqual([['a', fn1], ['b', fn2]]);
  });

  it('handles null input', () => {
    expect(toPairs(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(toPairs(undefined)).toEqual([]);
  });

  it('handles non-object input', () => {
    expect(toPairs('string')).toEqual([]);
    expect(toPairs(123)).toEqual([]);
    expect(toPairs(true)).toEqual([]);
  });
});
