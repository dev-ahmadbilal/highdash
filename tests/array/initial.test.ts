import { initial } from '../../src/array/initial';

describe('initial', () => {
  it('returns all but the last element', () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
  });
  it('empty for single element', () => {
    expect(initial([1])).toEqual([]);
  });
  it('empty for empty array', () => {
    expect(initial([])).toEqual([]);
  });
  it('works with strings', () => {
    expect(initial(['a', 'b', 'c'])).toEqual(['a', 'b']);
  });
});
