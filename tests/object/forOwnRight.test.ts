import { forOwnRight } from '../../src/object/forOwnRight.js';

describe('forOwnRight', () => {
  it('should iterate over own enumerable properties in reverse order', () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    const obj = new Foo();
    const result: string[] = [];

    forOwnRight(obj, function (value, key) {
      result.push(key as string);
    });

    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result).not.toContain('c'); // Inherited property should not be included
  });

  it('should pass correct arguments to iteratee', () => {
    const obj = { a: 1, b: 2 };
    const iteratee = jest.fn();

    forOwnRight(obj, iteratee);

    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj);
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj);
  });

  it('should break iteration when iteratee returns false', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const iteratee = jest.fn().mockImplementation((value, key) => {
      if (key === 'b') return false;
      return true;
    });

    forOwnRight(obj, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(2);
    expect(iteratee).toHaveBeenCalledWith(3, 'c', obj);
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj);
    expect(iteratee).not.toHaveBeenCalledWith(1, 'a', obj);
  });

  it('should return the original object', () => {
    const obj = { a: 1, b: 2 };
    const result = forOwnRight(obj, () => {});

    expect(result).toBe(obj);
  });

  it('should handle null/undefined object', () => {
    expect(forOwnRight(null as any, () => {})).toBeNull();
    expect(forOwnRight(undefined as any, () => {})).toBeUndefined();
  });

  it('should handle non-object', () => {
    expect(forOwnRight('string' as any, () => {})).toBe('string');
    expect(forOwnRight(123 as any, () => {})).toBe(123);
  });

  it('should handle empty object', () => {
    const obj = {};
    const iteratee = jest.fn();

    forOwnRight(obj, iteratee);

    expect(iteratee).not.toHaveBeenCalled();
  });

  it('should iterate in reverse order', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result: string[] = [];

    forOwnRight(obj, function (value, key) {
      result.push(key as string);
    });

    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result).toContain('c');
  });

  it('should handle object with symbol keys', () => {
    const sym = Symbol('test');
    const obj = { [sym]: 'value', a: 1 };
    const result: any[] = [];

    forOwnRight(obj, function (value, key) {
      result.push([value, key]);
    });

    expect(result).toContainEqual([1, 'a']);
    // Symbol keys are not enumerable in for...in loop
  });

  it('should not iterate over inherited properties', () => {
    const parent = { inherited: 'value' };
    const child = Object.create(parent);
    child.own = 'value';

    const result: string[] = [];
    forOwnRight(child, function (value, key) {
      result.push(key as string);
    });

    expect(result).toContain('own');
    expect(result).not.toContain('inherited');
  });
});
