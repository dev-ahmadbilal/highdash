import { difference } from '../../src/array/difference';

describe('difference', () => {
  it('should create array of values not in other arrays', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
    expect(difference([1, 2, 3], [2, 3], [3, 4])).toEqual([1]);
  });

  it('should handle empty arrays', () => {
    expect(difference([], [1, 2])).toEqual([]);
    expect(difference([1, 2], [])).toEqual([1, 2]);
  });

  it('should handle multiple arrays', () => {
    expect(difference([1, 2, 3, 4], [2], [3])).toEqual([1, 4]);
  });

  it('should handle non-array inputs', () => {
    expect(difference([1, 2, 3], null as any, [2])).toEqual([1, 3]);
    expect(difference(null as any, [1, 2])).toEqual([]);
  });

  it('should preserve order from first array', () => {
    expect(difference([3, 1, 2], [2])).toEqual([3, 1]);
  });
});
