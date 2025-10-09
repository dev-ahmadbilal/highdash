import { meanBy } from '../../src/math/meanBy.js';

describe('meanBy', () => {
  it('should calculate mean by function iteratee', () => {
    const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
    const result = meanBy(objects, (o) => o.n);
    expect(result).toBe(5);
  });

  it('should calculate mean by string iteratee', () => {
    const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
    const result = meanBy(objects, 'n');
    expect(result).toBe(5);
  });

  it('should handle empty array', () => {
    const result = meanBy([], 'n');
    expect(result).toBeNaN();
  });

  it('should handle null/undefined array', () => {
    expect(meanBy(null as any, 'n')).toBeNaN();
    expect(meanBy(undefined as any, 'n')).toBeNaN();
  });

  it('should handle non-array input', () => {
    expect(meanBy('string' as any, 'n')).toBeNaN();
    expect(meanBy(123 as any, 'n')).toBeNaN();
  });

  it('should handle single element', () => {
    const objects = [{ n: 5 }];
    const result = meanBy(objects, 'n');
    expect(result).toBe(5);
  });

  it('should handle negative numbers', () => {
    const objects = [{ n: -4 }, { n: -2 }, { n: -8 }, { n: -6 }];
    const result = meanBy(objects, 'n');
    expect(result).toBe(-5);
  });

  it('should handle mixed positive and negative numbers', () => {
    const objects = [{ n: 4 }, { n: -2 }, { n: 8 }, { n: -6 }];
    const result = meanBy(objects, 'n');
    expect(result).toBe(1);
  });

  it('should handle decimal numbers', () => {
    const objects = [{ n: 1.5 }, { n: 2.5 }, { n: 3.5 }];
    const result = meanBy(objects, 'n');
    expect(result).toBe(2.5);
  });

  it('should handle zero values', () => {
    const objects = [{ n: 0 }, { n: 0 }, { n: 0 }];
    const result = meanBy(objects, 'n');
    expect(result).toBe(0);
  });

  it('should handle function iteratee with complex logic', () => {
    const objects = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
      { a: 5, b: 6 },
    ];
    const result = meanBy(objects, (o) => o.a + o.b);
    expect(result).toBe(7); // (3 + 7 + 11) / 3 = 7
  });

  it('should handle string iteratee with nested properties', () => {
    const objects = [{ user: { age: 20 } }, { user: { age: 30 } }, { user: { age: 40 } }];
    const result = meanBy(objects, 'user.age');
    expect(result).toBe(30);
  });

  it('should handle missing properties', () => {
    const objects = [
      { n: 4 },
      { m: 2 }, // missing 'n' property
      { n: 8 },
    ];
    const result = meanBy(objects, 'n');
    expect(result).toBe(4); // (4 + 0 + 8) / 3 = 4 (undefined treated as 0)
  });

  it('should handle non-numeric values', () => {
    const objects = [
      { n: 4 },
      { n: '2' }, // string number
      { n: 8 },
    ];
    const result = meanBy(objects, 'n');
    expect(result).toBeNaN(); // '2' + 4 + 8 = '248', then '248' / 3 = NaN
  });
});
