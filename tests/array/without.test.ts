import { without } from '../../src/array/without';

describe('without', () => {
  it('creates array excluding given values', () => {
    expect(without([1, 2, 1, 3], 1, 2)).toEqual([3]);
  });
  it('returns copy when no values excluded', () => {
    const input = [1, 2, 3];
    const out = without(input, 4);
    expect(out).toEqual([1, 2, 3]);
    expect(out).not.toBe(input);
  });
  it('works with strings', () => {
    expect(without(['a', 'b', 'a'], 'a')).toEqual(['b']);
  });
});
