import { forIn } from '../../src/object/forIn.js';

describe('forIn', () => {
  it('should iterate over own and inherited properties', () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    const obj = new Foo();
    const result: string[] = [];
    
    forIn(obj, function(value, key) {
      result.push(key as string);
    });

    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result).toContain('c');
  });

  it('should pass correct arguments to iteratee', () => {
    const obj = { a: 1, b: 2 };
    const iteratee = jest.fn();
    
    forIn(obj, iteratee);

    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj);
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj);
  });

  it('should break iteration when iteratee returns false', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const iteratee = jest.fn().mockImplementation((value, key) => {
      if (key === 'b') return false;
      return true;
    });
    
    forIn(obj, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(2);
    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj);
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj);
    expect(iteratee).not.toHaveBeenCalledWith(3, 'c', obj);
  });

  it('should return the original object', () => {
    const obj = { a: 1, b: 2 };
    const result = forIn(obj, () => {});
    
    expect(result).toBe(obj);
  });

  it('should handle null/undefined object', () => {
    expect(forIn(null as any, () => {})).toBeNull();
    expect(forIn(undefined as any, () => {})).toBeUndefined();
  });

  it('should handle non-object', () => {
    expect(forIn('string' as any, () => {})).toBe('string');
    expect(forIn(123 as any, () => {})).toBe(123);
  });

  it('should handle empty object', () => {
    const obj = {};
    const iteratee = jest.fn();
    
    forIn(obj, iteratee);
    
    expect(iteratee).not.toHaveBeenCalled();
  });

  it('should handle array-like object', () => {
    const obj = { 0: 'a', 1: 'b', length: 2 };
    const result: string[] = [];
    
    forIn(obj, function(value, key) {
      result.push(key as string);
    });

    expect(result).toContain('0');
    expect(result).toContain('1');
    expect(result).toContain('length');
  });

  it('should handle object with symbol keys', () => {
    const sym = Symbol('test');
    const obj = { [sym]: 'value', a: 1 };
    const result: any[] = [];
    
    forIn(obj, function(value, key) {
      result.push([value, key]);
    });

    expect(result).toContainEqual([1, 'a']);
    // Symbol keys are not enumerable in for...in loop
  });
});
