import { defaultTo } from '../../src/util/defaultTo';

describe('defaultTo', () => {
  it('should return value when not null or undefined', () => {
    expect(defaultTo(1, 10)).toBe(1);
    expect(defaultTo('hello', 'world')).toBe('hello');
    expect(defaultTo(true, false)).toBe(true);
    expect(defaultTo(0, 10)).toBe(0);
    expect(defaultTo('', 'default')).toBe('');
    expect(defaultTo(false, true)).toBe(false);
  });

  it('should return default when value is null', () => {
    expect(defaultTo(null, 10)).toBe(10);
    expect(defaultTo(null, 'default')).toBe('default');
    expect(defaultTo(null, true)).toBe(true);
  });

  it('should return default when value is undefined', () => {
    expect(defaultTo(undefined, 10)).toBe(10);
    expect(defaultTo(undefined, 'default')).toBe('default');
    expect(defaultTo(undefined, true)).toBe(true);
  });

  it('should work with objects', () => {
    const obj = { a: 1 };
    const defaultObj = { b: 2 };
    
    expect(defaultTo(obj, defaultObj)).toBe(obj);
    expect(defaultTo(null, defaultObj)).toBe(defaultObj);
    expect(defaultTo(undefined, defaultObj)).toBe(defaultObj);
  });

  it('should work with arrays', () => {
    const arr = [1, 2, 3];
    const defaultArr = [4, 5, 6];
    
    expect(defaultTo(arr, defaultArr)).toBe(arr);
    expect(defaultTo(null, defaultArr)).toBe(defaultArr);
    expect(defaultTo(undefined, defaultArr)).toBe(defaultArr);
  });

  it('should work with functions', () => {
    const fn = () => 'hello';
    const defaultFn = () => 'world';
    
    expect(defaultTo(fn, defaultFn)).toBe(fn);
    expect(defaultTo(null, defaultFn)).toBe(defaultFn);
    expect(defaultTo(undefined, defaultFn)).toBe(defaultFn);
  });

  it('should work with NaN', () => {
    expect(defaultTo(NaN, 10)).toBe(NaN); // NaN is not null or undefined
  });

  it('should work with Infinity', () => {
    expect(defaultTo(Infinity, 10)).toBe(Infinity);
    expect(defaultTo(-Infinity, 10)).toBe(-Infinity);
  });
});
