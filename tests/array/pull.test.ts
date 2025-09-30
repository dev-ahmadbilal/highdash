import { pull } from '../../src/array/pull';

describe('pull', () => {
  it('removes specified values', () => {
    const arr = [1, 2, 3, 1, 2, 3];
    const result = pull(arr, 2, 3);
    expect(result).toBe(arr);
    expect(arr).toEqual([1, 1]);
  });
  it('handles values not present', () => {
    const arr = [1, 2, 3];
    pull(arr, 4);
    expect(arr).toEqual([1, 2, 3]);
  });
  it('works with strings', () => {
    const arr = ['a', 'b', 'c', 'a'];
    pull(arr, 'a');
    expect(arr).toEqual(['b', 'c']);
  });
});
