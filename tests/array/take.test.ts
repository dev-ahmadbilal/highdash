import { take } from '../../src/array/take';

describe('take', () => {
  it('should take n elements from the beginning', () => {
    expect(take([1, 2, 3, 4], 2)).toEqual([1, 2]);
    expect(take([1, 2, 3, 4], 3)).toEqual([1, 2, 3]);
  });

  it('should take all elements if n is greater than array length', () => {
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it('should return empty array if n is 0 or negative', () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
    expect(take([1, 2, 3], -1)).toEqual([]);
  });

  it('should default to taking 1 element', () => {
    expect(take([1, 2, 3])).toEqual([1]);
  });

  it('should return empty array for non-array', () => {
    expect(take(null as any, 2)).toEqual([]);
    expect(take(undefined as any, 2)).toEqual([]);
  });
});
