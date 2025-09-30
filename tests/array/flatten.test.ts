import { flatten } from '../../src/array/flatten';

describe('flatten', () => {
  it('should flatten array one level deep', () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
  });

  it('should handle empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(flatten(null as any)).toEqual([]);
    expect(flatten(undefined as any)).toEqual([]);
  });

  it('should handle already flat array', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
