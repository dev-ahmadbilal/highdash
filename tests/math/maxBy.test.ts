import { maxBy } from '../../src/math/maxBy';

describe('maxBy', () => {
  it('should find max by function iteratee', () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(maxBy(objects, (o) => o.n)).toEqual({ n: 2 });
  });

  it('should find max by string property', () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(maxBy(objects, 'n')).toEqual({ n: 2 });
  });

  it('should handle empty array', () => {
    expect(maxBy([], 'n')).toBeUndefined();
  });

  it('should handle non-array input', () => {
    expect(maxBy(null as any, 'n')).toBeUndefined();
  });

  it('should handle single element', () => {
    const objects = [{ n: 1 }];
    expect(maxBy(objects, 'n')).toEqual({ n: 1 });
  });

  it('should handle non-numeric values', () => {
    const objects = [{ n: 1 }, { n: 'invalid' }, { n: 3 }];
    expect(maxBy(objects, 'n')).toEqual({ n: 3 });
  });
});
