import { zip } from '../../src/array/zip';

describe('zip', () => {
  it('should group elements from multiple arrays', () => {
    expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });

  it('should handle arrays of different lengths', () => {
    expect(zip(['a', 'b', 'c'], [1, 2])).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', undefined],
    ]);
  });

  it('should handle empty arrays', () => {
    expect(zip([], [1, 2])).toEqual([]);
    expect(zip()).toEqual([]);
  });

  it('should handle single array', () => {
    expect(zip([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  it('should handle non-array inputs', () => {
    expect(zip([1, 2], null as any, [3, 4])).toEqual([
      [1, undefined, 3],
      [2, undefined, 4],
    ]);
  });
});
