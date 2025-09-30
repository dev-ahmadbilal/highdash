import { flow } from '../../src/util/flow';

describe('flow', () => {
  it('should compose functions from left to right', () => {
    const add = (a: number, b: number) => a + b;
    const square = (n: number) => n * n;
    
    const addSquare = flow([add, square]);
    expect(addSquare(1, 2)).toBe(9);
  });

  it('should handle single function', () => {
    const square = (n: number) => n * n;
    const squareFlow = flow([square]);
    expect(squareFlow(3)).toBe(9);
  });

  it('should handle empty array', () => {
    const emptyFlow = flow([]);
    expect(emptyFlow(1, 2, 3)).toBe(1);
  });

  it('should handle multiple functions', () => {
    const add = (a: number, b: number) => a + b;
    const square = (n: number) => n * n;
    const double = (n: number) => n * 2;
    
    const composed = flow([add, square, double]);
    expect(composed(1, 2)).toBe(18); // (1+2)^2 * 2 = 9 * 2 = 18
  });
});
