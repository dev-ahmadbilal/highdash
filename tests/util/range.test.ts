import { range } from '../../src/util/range';

describe('range', () => {
  it('should generate range from 0 to end', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
  });

  it('should generate range from start to end', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });

  it('should generate range with step', () => {
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });

  it('should generate negative range', () => {
    expect(range(-4)).toEqual([0, -1, -2, -3]);
  });

  it('should generate negative range with step', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it('should handle step 0', () => {
    expect(range(1, 4, 0)).toEqual([1, 1, 1]);
  });

  it('should handle empty range', () => {
    expect(range(0)).toEqual([]);
  });

  it('should handle default parameters', () => {
    expect(range()).toEqual([]);
  });
});
