import { cond } from '../../src/util/cond';

describe('cond', () => {
  it('should return function that executes first matching condition', () => {
    const func = cond([
      [(n: number) => n > 10, () => 'big'],
      [(n: number) => n > 5, () => 'medium'],
      [() => true, () => 'small']
    ]);
    
    expect(func(15)).toBe('big');
    expect(func(8)).toBe('medium');
    expect(func(3)).toBe('small');
  });

  it('should return undefined when no conditions match', () => {
    const func = cond([
      [(n: number) => n > 10, () => 'big'],
      [(n: number) => n > 5, () => 'medium']
    ]);
    
    expect(func(3)).toBe(undefined);
  });

  it('should work with single condition', () => {
    const func = cond([
      [(n: number) => n > 0, (n: number) => n * 2]
    ]);
    
    expect(func(5)).toBe(10);
    expect(func(-1)).toBe(undefined);
  });

  it('should work with empty conditions array', () => {
    const func = cond([]);
    expect(func(5)).toBe(undefined);
  });

  it('should pass all arguments to condition and result functions', () => {
    const func = cond([
      [(a: number, b: number) => a > b, (a: number, b: number) => a - b],
      [() => true, (a: number, b: number) => a + b]
    ]);
    
    expect(func(10, 5)).toBe(5);  // 10 - 5
    expect(func(3, 7)).toBe(10);  // 3 + 7
  });

  it('should work with different data types', () => {
    const func = cond([
      [(s: string) => s.length > 5, (s: string) => s.toUpperCase()],
      [(s: string) => s.length > 0, (s: string) => s.toLowerCase()],
      [() => true, () => 'empty']
    ]);
    
    expect(func('hello world')).toBe('HELLO WORLD');
    expect(func('hi')).toBe('hi');
    expect(func('')).toBe('empty');
  });

  it('should work with boolean conditions', () => {
    const func = cond([
      [true, () => 'always true'],
      [false, () => 'never reached']
    ]);
    
    expect(func()).toBe('always true');
  });

  it('should work with null and undefined conditions', () => {
    const func = cond([
      [(n: any) => n === null, () => 'null'],
      [(n: any) => n === undefined, () => 'undefined'],
      [() => true, () => 'other']
    ]);
    
    expect(func(null)).toBe('null');
    expect(func(undefined)).toBe('undefined');
    expect(func(0)).toBe('other');
  });
});
