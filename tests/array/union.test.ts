import { union } from '../../src/array/union';

describe('union', () => {
  it('should create array of unique values from all arrays', () => {
    expect(union([2], [1, 2])).toEqual([2, 1]);
    expect(union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should handle empty arrays', () => {
    expect(union([], [1, 2])).toEqual([1, 2]);
    expect(union([1, 2], [])).toEqual([1, 2]);
    expect(union()).toEqual([]);
  });

  it('should handle single array', () => {
    expect(union([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle non-array inputs', () => {
    expect(union([1, 2], null as any, [3, 4])).toEqual([1, 2, 3, 4]);
    expect(union(null as any, [1, 2])).toEqual([1, 2]);
  });

  it('should preserve order from first occurrence', () => {
    expect(union([3, 1, 2], [2, 3, 4])).toEqual([3, 1, 2, 4]);
  });
});
