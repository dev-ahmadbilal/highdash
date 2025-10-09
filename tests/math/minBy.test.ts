import { minBy } from '../../src/math/minBy';

describe('minBy', () => {
  it('should find min by function iteratee', () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(minBy(objects, (o) => o.n)).toEqual({ n: 1 });
  });

  it('should find min by string property', () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(minBy(objects, 'n')).toEqual({ n: 1 });
  });

  it('should handle empty array', () => {
    expect(minBy([], 'n')).toBeUndefined();
  });

  it('should handle non-array input', () => {
    expect(minBy(null as any, 'n')).toBeUndefined();
  });

  it('should handle single element', () => {
    const objects = [{ n: 1 }];
    expect(minBy(objects, 'n')).toEqual({ n: 1 });
  });

  it('should handle non-numeric values', () => {
    const objects = [{ n: 1 }, { n: 'invalid' }, { n: 3 }];
    expect(minBy(objects, 'n')).toEqual({ n: 1 });
  });
});
