import { head } from '../../src/array/head';

describe('head', () => {
  it('should return the first element', () => {
    expect(head([1, 2, 3])).toBe(1);
    expect(head(['a', 'b', 'c'])).toBe('a');
  });

  it('should return undefined for empty array', () => {
    expect(head([])).toBeUndefined();
  });

  it('should return undefined for non-array', () => {
    expect(head(null as any)).toBeUndefined();
    expect(head(undefined as any)).toBeUndefined();
  });

  it('should return the only element for single element array', () => {
    expect(head([42])).toBe(42);
  });
});
