import { inRange } from '../../src/number/inRange';

describe('inRange', () => {
  it('defaults start to 0 when end is provided as start', () => {
    expect(inRange(2, 5)).toBe(true); // 0..5
    expect(inRange(-1, 5)).toBe(false);
  });

  it('checks within [start, end) range', () => {
    expect(inRange(3, 2, 4)).toBe(true);
    expect(inRange(4, 2, 4)).toBe(false);
    expect(inRange(2, 2, 4)).toBe(true);
  });

  it('swaps when start > end', () => {
    expect(inRange(3, 4, 2)).toBe(true); // treated as 2..4
    expect(inRange(1, 4, 2)).toBe(false);
  });

  it('handles negative ranges', () => {
    expect(inRange(-1, -3, -1)).toBe(true);
    expect(inRange(-1, -3, -2)).toBe(false);
  });

  it('handles NaN as always false', () => {
    expect(inRange(NaN as any, 0, 1)).toBe(false);
    expect(inRange(1, NaN as any, 2)).toBe(false);
    expect(inRange(1, 0, NaN as any)).toBe(false);
  });
});
