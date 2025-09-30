import { invert } from '../../src/object/invert';

describe('invert', () => {
  it('should invert object keys and values', () => {
    const object = { a: 1, b: 2, c: 1 };
    const result = invert(object);
    
    expect(result).toEqual({ '1': 'c', '2': 'b' });
  });

  it('should work with string values', () => {
    const object = { a: 'x', b: 'y', c: 'x' };
    const result = invert(object);
    
    expect(result).toEqual({ 'x': 'c', 'y': 'b' });
  });

  it('should work with mixed value types', () => {
    const object = { a: 1, b: 'hello', c: true };
    const result = invert(object);
    
    expect(result).toEqual({ '1': 'a', 'hello': 'b', 'true': 'c' });
  });

  it('should handle empty object', () => {
    const result = invert({});
    expect(result).toEqual({});
  });

  it('should handle null and undefined values', () => {
    const object = { a: null, b: undefined, c: 1 };
    const result = invert(object);
    
    expect(result).toEqual({ 'null': 'a', 'undefined': 'b', '1': 'c' });
  });

  it('should handle duplicate values (last key wins)', () => {
    const object = { a: 1, b: 2, c: 1, d: 2 };
    const result = invert(object);
    
    expect(result).toEqual({ '1': 'c', '2': 'd' });
  });

  it('should handle boolean values', () => {
    const object = { a: true, b: false, c: true };
    const result = invert(object);
    
    expect(result).toEqual({ 'true': 'c', 'false': 'b' });
  });

  it('should handle non-object input', () => {
    const result = invert(null);
    expect(result).toEqual({});
  });
});
