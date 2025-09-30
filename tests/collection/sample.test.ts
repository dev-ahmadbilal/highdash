import { sample } from '../../src/collection/sample';

describe('sample', () => {
  it('returns random element from collection', () => {
    const collection = [1, 2, 3, 4];
    const result = sample(collection);
    expect(collection).toContain(result);
  });

  it('returns undefined for empty collection', () => {
    expect(sample([])).toBeUndefined();
  });

  it('handles null input', () => {
    expect(sample(null)).toBeUndefined();
  });

  it('handles undefined input', () => {
    expect(sample(undefined)).toBeUndefined();
  });

  it('works with objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = sample(obj);
    expect([1, 2, 3]).toContain(result);
  });

  it('works with strings', () => {
    const str = 'hello';
    const result = sample(str);
    expect(['h', 'e', 'l', 'l', 'o']).toContain(result);
  });
});
