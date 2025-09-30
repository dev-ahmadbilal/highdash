import { flattenDeep } from '../../src/array/flattenDeep';

describe('flattenDeep', () => {
  it('should flatten array recursively', () => {
    expect(flattenDeep([1, [2, [3, [4]], 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle empty array', () => {
    expect(flattenDeep([])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(flattenDeep(null as any)).toEqual([]);
    expect(flattenDeep(undefined as any)).toEqual([]);
  });

  it('should handle already flat array', () => {
    expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle deeply nested arrays', () => {
    expect(flattenDeep([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
  });
});
