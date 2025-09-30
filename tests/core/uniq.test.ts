import { uniq, uniqBy } from '../../src/core/uniq';

describe('uniq', () => {
  it('should remove duplicates from array', () => {
    expect(uniq([2, 1, 2])).toEqual([2, 1]);
    expect(uniq([1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    expect(uniq([])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(uniq(null as any)).toEqual([]);
    expect(uniq(undefined as any)).toEqual([]);
  });

  it('should handle different types', () => {
    expect(uniq([1, '1', 1, '1'])).toEqual([1, '1']);
  });
});

describe('uniqBy', () => {
  it('should remove duplicates by iteratee function', () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });

  it('should remove duplicates by property', () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 1 }];
    expect(uniqBy(objects, 'x')).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it('should handle empty array', () => {
    expect(uniqBy([], Math.floor)).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(uniqBy(null as any, Math.floor)).toEqual([]);
  });
});
