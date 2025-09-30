import { sumBy } from '../../src/math/sumBy';

describe('sumBy', () => {
  it('should sum by function iteratee', () => {
    const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
    expect(sumBy(objects, o => o.n)).toBe(20);
  });

  it('should sum by string property', () => {
    const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
    expect(sumBy(objects, 'n')).toBe(20);
  });

  it('should handle empty array', () => {
    expect(sumBy([], 'n')).toBe(0);
  });

  it('should handle non-array input', () => {
    expect(sumBy(null as any, 'n')).toBe(0);
  });

  it('should handle non-numeric values', () => {
    const objects = [{ 'n': 1 }, { 'n': '2' }, { 'n': 3 }, { 'n': 'invalid' }];
    expect(sumBy(objects, 'n')).toBe(6);
  });
});
