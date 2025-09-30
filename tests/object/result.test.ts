import { result } from '../../src/object/result';

describe('result', () => {
  it('returns value at path', () => {
    expect(result({ a: { b: 1 } }, 'a.b')).toBe(1);
  });
  it('invokes function at path', () => {
    const obj = { a: { b: () => 5 } } as const;
    expect(result(obj, 'a.b')).toBe(5);
  });
  it('returns default when missing', () => {
    expect(result({}, 'a.b', 7 as any)).toBe(7);
  });
  it('invokes default when function', () => {
    expect(result({}, 'a', (() => 9) as any)).toBe(9);
  });
});
