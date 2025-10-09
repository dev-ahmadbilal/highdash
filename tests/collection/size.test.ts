import { size } from '../../src/collection/size';

describe('size', () => {
  it('should return length for arrays', () => {
    expect(size([1, 2, 3])).toBe(3);
    expect(size([])).toBe(0);
  });

  it('should return length for strings', () => {
    expect(size('hello')).toBe(5);
    expect(size('')).toBe(0);
  });

  it('should return size for maps and sets', () => {
    expect(
      size(
        new Map([
          ['a', 1],
          ['b', 2],
        ]),
      ),
    ).toBe(2);
    expect(size(new Set([1, 2, 3]))).toBe(3);
  });

  it('should return key count for objects', () => {
    expect(size({ a: 1, b: 2 })).toBe(2);
    expect(size({})).toBe(0);
  });

  it('should return 0 for null/undefined', () => {
    expect(size(null)).toBe(0);
    expect(size(undefined)).toBe(0);
  });

  it('should return 0 for primitives', () => {
    expect(size(42)).toBe(0);
    expect(size(true)).toBe(0);
  });
});
