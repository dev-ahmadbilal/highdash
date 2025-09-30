import { remove } from '../../src/array/remove';

describe('remove', () => {
  it('removes elements matching predicate and returns them', () => {
    const arr = [1, 2, 3, 4];
    const removed = remove(arr, (n) => n % 2 === 0);
    expect(arr).toEqual([1, 3]);
    expect(removed).toEqual([2, 4]);
  });
  it('handles no matches', () => {
    const arr = [1, 3, 5];
    const removed = remove(arr, (n) => n % 2 === 0);
    expect(arr).toEqual([1, 3, 5]);
    expect(removed).toEqual([]);
  });
});
