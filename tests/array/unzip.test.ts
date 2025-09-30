import { unzip } from '../../src/array/unzip';

describe('unzip', () => {
  it('unpairs grouped elements', () => {
    expect(unzip([[1, 'a'], [2, 'b']])).toEqual([[1, 2], ['a', 'b']]);
  });
  it('handles uneven groups', () => {
    expect(unzip([[1, 'a'], [2], [3, 'c']])).toEqual([[1, 2, 3], ['a', undefined, 'c']]);
  });
  it('empty input', () => {
    expect(unzip([])).toEqual([]);
  });
});
