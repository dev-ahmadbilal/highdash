import { last } from '../../src/array/last';

describe('last', () => {
  it('should return the last element', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(['a', 'b', 'c'])).toBe('c');
  });

  it('should return undefined for empty array', () => {
    expect(last([])).toBeUndefined();
  });

  it('should return undefined for non-array', () => {
    expect(last(null as any)).toBeUndefined();
    expect(last(undefined as any)).toBeUndefined();
  });

  it('should return the only element for single element array', () => {
    expect(last([42])).toBe(42);
  });
});
