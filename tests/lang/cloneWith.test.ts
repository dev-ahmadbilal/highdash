import { cloneWith } from '../../src/lang/cloneWith';

describe('cloneWith', () => {
  it('should use customizer when provided', () => {
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value * 2;
      }
      return undefined;
    };

    const obj = { a: 1, b: 2 };
    const result = cloneWith(obj, customizer);
    
    expect(result).toEqual({ a: 2, b: 4 });
  });

  it('should fall back to clone when customizer returns undefined', () => {
    const customizer = (value: any) => {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return undefined;
    };

    const obj = { a: 'hello', b: 'world' };
    const result = cloneWith(obj, customizer);
    
    expect(result).toEqual({ a: 'HELLO', b: 'WORLD' });
  });

  it('should work with arrays', () => {
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value + 1;
      }
      return undefined;
    };

    const arr = [1, 2, 3];
    const result = cloneWith(arr, customizer);
    
    expect(result).toEqual([2, 3, 4]);
  });

  it('should work with nested objects', () => {
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value * 2;
      }
      return undefined;
    };

    const obj = { a: { b: 1, c: 2 } };
    const result = cloneWith(obj, customizer);
    
    expect(result).toEqual({ a: { b: 2, c: 4 } });
  });

  it('should work with mixed types', () => {
    const customizer = (value: any) => {
      if (typeof value === 'string') {
        return value.toUpperCase();
      } else if (typeof value === 'number') {
        return value * 2;
      }
      return undefined;
    };

    const obj = { a: 'hello', b: 5, c: true };
    const result = cloneWith(obj, customizer);
    
    expect(result).toEqual({ a: 'HELLO', b: 10, c: true });
  });

  it('should work with no customizer', () => {
    const obj = { a: 1, b: 2 };
    const result = cloneWith(obj);
    
    expect(result).toEqual({ a: 1, b: 2 });
    expect(result).not.toBe(obj);
  });

  it('should work with null and undefined values', () => {
    const customizer = (value: any) => {
      if (value === null) {
        return 'null';
      } else if (value === undefined) {
        return 'undefined';
      }
      return undefined;
    };

    const obj = { a: null, b: undefined };
    const result = cloneWith(obj, customizer);
    
    expect(result).toEqual({ a: 'null', b: 'undefined' });
  });

  it('should work with functions', () => {
    const customizer = (value: any) => {
      if (typeof value === 'function') {
        return () => 'customized';
      }
      return undefined;
    };

    const obj = { fn: () => 'original' };
    const result = cloneWith(obj, customizer);
    
    expect(result.fn()).toBe('customized');
  });

  it('should work with dates', () => {
    const customizer = (value: any) => {
      if (value instanceof Date) {
        return new Date(value.getTime() + 1000);
      }
      return undefined;
    };

    const date = new Date('2023-01-01');
    const obj = { date };
    const result = cloneWith(obj, customizer);
    
    expect(result.date.getTime()).toBe(date.getTime() + 1000);
  });

  it('should work with regex', () => {
    const customizer = (value: any) => {
      if (value instanceof RegExp) {
        return new RegExp(value.source + 'i');
      }
      return undefined;
    };

    const regex = /abc/;
    const obj = { pattern: regex };
    const result = cloneWith(obj, customizer);
    
    expect(result.pattern.source).toBe('abci');
  });

  it('should work with complex nested structures', () => {
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value * 2;
      }
      return undefined;
    };

    const obj = {
      a: 1,
      b: {
        c: 2,
        d: [3, 4]
      }
    };
    const result = cloneWith(obj, customizer);
    
    expect(result).toEqual({
      a: 2,
      b: {
        c: 4,
        d: [6, 8]
      }
    });
  });
});
