import { setIn } from '../../src/object/setIn.js';

describe('setIn', () => {
  it('should set value at simple path', () => {
    const object = { a: 1, b: 2 };
    const result = setIn(object, 'c', 3);
    
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).not.toBe(object);
  });

  it('should set value at nested path', () => {
    const object = { a: { b: 1 } };
    const result = setIn(object, 'a.c', 2);
    
    expect(result).toEqual({ a: { b: 1, c: 2 } });
    expect(result).not.toBe(object);
    expect(result.a).not.toBe(object.a);
  });

  it('should set value at array path', () => {
    const object = { a: [1, 2, 3] };
    const result = setIn(object, 'a.1', 4);
    
    expect(result).toEqual({ a: [1, 4, 3] });
    expect(result).not.toBe(object);
    expect(result.a).not.toBe(object.a);
  });

  it('should create nested objects', () => {
    const object = {};
    const result = setIn(object, 'a.b.c', 1);
    
    expect(result).toEqual({ a: { b: { c: 1 } } });
  });

  it('should create nested arrays', () => {
    const object = {};
    const result = setIn(object, 'a.0.b', 1);
    
    expect(result).toEqual({ a: [{ b: 1 }] });
  });

  it('should handle array notation', () => {
    const object = { a: [1, 2, 3] };
    const result = setIn(object, 'a[1]', 4);
    
    expect(result).toEqual({ a: [1, 4, 3] });
  });

  it('should handle mixed path notation', () => {
    const object = { a: { b: [1, 2, 3] } };
    const result = setIn(object, 'a.b[1]', 4);
    
    expect(result).toEqual({ a: { b: [1, 4, 3] } });
  });

  it('should handle array path', () => {
    const object = { a: 1 };
    const result = setIn(object, ['b', 'c'], 2);
    
    expect(result).toEqual({ a: 1, b: { c: 2 } });
  });

  it('should handle empty path', () => {
    const object = { a: 1 };
    const result = setIn(object, '', 2);
    
    expect(result).toBe(2);
  });

  it('should handle null/undefined values', () => {
    const object = { a: 1 };
    const result1 = setIn(object, 'b', null);
    const result2 = setIn(object, 'c', undefined);
    
    expect(result1).toEqual({ a: 1, b: null });
    expect(result2).toEqual({ a: 1, c: undefined });
  });

  it('should handle complex nested structures', () => {
    const object = {
      a: {
        b: [1, 2, { c: 3 }],
        d: { e: 4 }
      },
      f: [5, 6]
    };
    const result = setIn(object, 'a.b.2.f', 5);
    
    expect(result).toEqual({
      a: {
        b: [1, 2, { c: 3, f: 5 }],
        d: { e: 4 }
      },
      f: [5, 6]
    });
  });
});
