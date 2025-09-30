import { intersection } from '../../src/array/intersection';

describe('intersection', () => {
  it('should create array of unique values included in all arrays', () => {
    expect(intersection([2, 1], [2, 3])).toEqual([2]);
    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
  });

  it('should handle empty arrays', () => {
    expect(intersection([], [1, 2])).toEqual([]);
    expect(intersection([1, 2], [])).toEqual([]);
    expect(intersection()).toEqual([]);
  });

  it('should handle single array', () => {
    expect(intersection([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle non-array inputs', () => {
    expect(intersection([1, 2, 3], null as any, [2, 3])).toEqual([]);
    expect(intersection(null as any, [1, 2])).toEqual([]);
  });

  it('should preserve order from first array', () => {
    expect(intersection([3, 1, 2], [2, 3], [3, 2])).toEqual([3, 2]);
  });

  it('should handle duplicates in first array', () => {
    expect(intersection([1, 1, 2], [1, 2])).toEqual([1, 2]);
  });
});
