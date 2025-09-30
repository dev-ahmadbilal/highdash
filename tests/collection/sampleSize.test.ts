import { sampleSize } from '../../src/collection/sampleSize';

describe('sampleSize', () => {
  it('returns random sample of specified size', () => {
    const collection = [1, 2, 3, 4];
    const result = sampleSize(collection, 2);
    expect(result).toHaveLength(2);
    result.forEach(item => {
      expect(collection).toContain(item);
    });
  });

  it('returns all elements when size exceeds collection length', () => {
    const collection = [1, 2, 3];
    const result = sampleSize(collection, 5);
    expect(result).toHaveLength(3);
  });

  it('returns empty array for size 0', () => {
    const collection = [1, 2, 3];
    const result = sampleSize(collection, 0);
    expect(result).toEqual([]);
  });

  it('handles empty collection', () => {
    expect(sampleSize([], 2)).toEqual([]);
  });

  it('handles null input', () => {
    expect(sampleSize(null, 2)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(sampleSize(undefined, 2)).toEqual([]);
  });

  it('works with objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = sampleSize(obj, 2);
    expect(result).toHaveLength(2);
  });

  it('works with strings', () => {
    const str = 'hello';
    const result = sampleSize(str, 3);
    expect(result).toHaveLength(3);
  });
});
