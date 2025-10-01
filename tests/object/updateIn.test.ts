import { updateIn } from '../../src/object/updateIn.js';

describe('updateIn', () => {
  it('should update value at simple path', () => {
    const object = { a: 1, b: 2 };
    const result = updateIn(object, 'a', x => (x as number) * 2);
    
    expect(result).toEqual({ a: 2, b: 2 });
    expect(result).not.toBe(object);
  });

  it('should update value at nested path', () => {
    const object = { a: { b: 1 } };
    const result = updateIn(object, 'a.b', x => (x as number) * 2);
    
    expect(result).toEqual({ a: { b: 2 } });
    expect(result).not.toBe(object);
    expect(result.a).not.toBe(object.a);
  });

  it('should update value at array path', () => {
    const object = { a: [1, 2, 3] };
    const result = updateIn(object, 'a.1', x => (x as number) * 2);
    
    expect(result).toEqual({ a: [1, 4, 3] });
    expect(result).not.toBe(object);
    expect(result.a).not.toBe(object.a);
  });

  it('should create nested objects for new paths', () => {
    const object = {};
    const result = updateIn(object, 'a.b.c', () => 1);
    
    expect(result).toEqual({ a: { b: { c: 1 } } });
  });

  it('should create nested arrays for new paths', () => {
    const object = {};
    const result = updateIn(object, 'a.0.b', () => 1);
    
    expect(result).toEqual({ a: [{ b: 1 }] });
  });

  it('should handle array notation', () => {
    const object = { a: [1, 2, 3] };
    const result = updateIn(object, 'a[1]', x => (x as number) * 2);
    
    expect(result).toEqual({ a: [1, 4, 3] });
  });

  it('should handle mixed path notation', () => {
    const object = { a: { b: [1, 2, 3] } };
    const result = updateIn(object, 'a.b[1]', x => (x as number) * 2);
    
    expect(result).toEqual({ a: { b: [1, 4, 3] } });
  });

  it('should handle array path', () => {
    const object = { a: 1 };
    const result = updateIn(object, ['b', 'c'], () => 2);
    
    expect(result).toEqual({ a: 1, b: { c: 2 } });
  });

  it('should handle empty path', () => {
    const object = { a: 1 };
    const result = updateIn(object, '', x => (x as any).a * 2);
    
    expect(result).toBe(2);
  });

  it('should handle updater function with current value', () => {
    const object = { a: { b: 5 } };
    const result = updateIn(object, 'a.b', (current, path, obj) => {
      expect(current).toBe(5);
      expect(path).toBe('a.b');
      expect(obj).toBe(object);
      return (current as number) * 2;
    });
    
    expect(result).toEqual({ a: { b: 10 } });
  });

  it('should handle complex nested structures', () => {
    const object = {
      a: {
        b: [1, 2, { c: 3 }],
        d: { e: 4 }
      }
    };
    const result = updateIn(object, 'a.b.2.c', x => (x as number) * 2);
    
    expect(result).toEqual({
      a: {
        b: [1, 2, { c: 6 }],
        d: { e: 4 }
      }
    });
  });

  it('should handle undefined values', () => {
    const object = { a: { b: undefined } };
    const result = updateIn(object, 'a.b', x => x === undefined ? 1 : (x as number) * 2);
    
    expect(result).toEqual({ a: { b: 1 } });
  });
});
