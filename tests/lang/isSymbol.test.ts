import { isSymbol } from '../../src/lang/isSymbol';

describe('isSymbol', () => {
  it('should return true for symbols', () => {
    expect(isSymbol(Symbol.iterator)).toBe(true);
    expect(isSymbol(Symbol('test'))).toBe(true);
    expect(isSymbol(Symbol.for('test'))).toBe(true);
  });

  it('should return false for non-symbols', () => {
    expect(isSymbol('abc')).toBe(false);
    expect(isSymbol(1)).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol(() => {})).toBe(false);
  });
});
