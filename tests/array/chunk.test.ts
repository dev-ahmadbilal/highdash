import { chunk } from '../../src/array/chunk';

describe('chunk', () => {
  it('should chunk array into groups of specified size', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
  });

  it('should handle empty array', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(chunk(null as any, 2)).toEqual([]);
    expect(chunk(undefined as any, 2)).toEqual([]);
  });

  it('should handle size 0', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
  });

  it('should handle negative size', () => {
    expect(chunk([1, 2, 3], -1)).toEqual([]);
  });

  it('should handle default size', () => {
    expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
  });
});
