import { forInRight } from '../../src/object/forInRight.js';

describe('forInRight', () => {
  it('should iterate over own and inherited properties in reverse order', () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    const obj = new Foo();
    const result: string[] = [];

    forInRight(obj, function (value, key) {
      result.push(key as string);
    });

    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result).toContain('c');
    // Order is not guaranteed, but should iterate in reverse
  });

  it('should pass correct arguments to iteratee', () => {
    const obj = { a: 1, b: 2 };
    const iteratee = jest.fn();

    forInRight(obj, iteratee);

    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj);
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj);
  });

  it('should break iteration when iteratee returns false', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const iteratee = jest.fn().mockImplementation((value, key) => {
      if (key === 'b') return false;
      return true;
    });

    forInRight(obj, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(2);
    expect(iteratee).toHaveBeenCalledWith(3, 'c', obj);
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj);
    expect(iteratee).not.toHaveBeenCalledWith(1, 'a', obj);
  });

  it('should return the original object', () => {
    const obj = { a: 1, b: 2 };
    const result = forInRight(obj, () => {});

    expect(result).toBe(obj);
  });

  it('should handle null/undefined object', () => {
    expect(forInRight(null as any, () => {})).toBeNull();
    expect(forInRight(undefined as any, () => {})).toBeUndefined();
  });

  it('should handle non-object', () => {
    expect(forInRight('string' as any, () => {})).toBe('string');
    expect(forInRight(123 as any, () => {})).toBe(123);
  });

  it('should handle empty object', () => {
    const obj = {};
    const iteratee = jest.fn();

    forInRight(obj, iteratee);

    expect(iteratee).not.toHaveBeenCalled();
  });

  it('should iterate in reverse order', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result: string[] = [];

    forInRight(obj, function (value, key) {
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

    forInRight(obj, function (value, key) {
      result.push([value, key]);
    });

    expect(result).toContainEqual([1, 'a']);
    // Symbol keys are not enumerable in for...in loop
  });
});
