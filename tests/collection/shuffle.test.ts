import { shuffle } from '../../src/collection/shuffle';

describe('shuffle', () => {
  it('returns shuffled array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = shuffle(array);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  it('returns new array', () => {
    const array = [1, 2, 3];
    const result = shuffle(array);
    expect(result).not.toBe(array);
  });

  it('handles empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles single element array', () => {
    expect(shuffle([1])).toEqual([1]);
  });

  it('handles null input', () => {
    expect(shuffle(null)).toEqual([]);
  });

  it('handles undefined input', () => {
    expect(shuffle(undefined)).toEqual([]);
  });

  it('works with objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = shuffle(obj);
    expect(result).toHaveLength(3);
    expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
  });

  it('works with strings', () => {
    const str = 'hello';
    const result = shuffle(str);
    expect(result).toHaveLength(5);
    expect(result).toEqual(expect.arrayContaining(['h', 'e', 'l', 'l', 'o']));
  });
});
