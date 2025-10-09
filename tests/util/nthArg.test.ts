import { nthArg } from '../../src/util/nthArg';

describe('nthArg', () => {
  it('should create function that returns nth argument', () => {
    const getFirst = nthArg(0);
    const getSecond = nthArg(1);
    const getThird = nthArg(2);

    expect(getFirst('a', 'b', 'c')).toBe('a');
    expect(getSecond('a', 'b', 'c')).toBe('b');
    expect(getThird('a', 'b', 'c')).toBe('c');
  });

  it('should return undefined for out of bounds index', () => {
    const getTenth = nthArg(10);
    expect(getTenth('a', 'b', 'c')).toBe(undefined);
  });

  it('should work with negative index', () => {
    const getLast = nthArg(-1);
    const getSecondLast = nthArg(-2);

    expect(getLast('a', 'b', 'c')).toBe('c');
    expect(getSecondLast('a', 'b', 'c')).toBe('b');
  });

  it('should work with no arguments', () => {
    const getFirst = nthArg(0);
    expect(getFirst()).toBe(undefined);
  });

  it('should work with single argument', () => {
    const getFirst = nthArg(0);
    const getSecond = nthArg(1);

    expect(getFirst('a')).toBe('a');
    expect(getSecond('a')).toBe(undefined);
  });

  it('should work with different data types', () => {
    const getFirst = nthArg(0);
    const getSecond = nthArg(1);
    const getThird = nthArg(2);

    expect(getFirst(1, 'hello', true)).toBe(1);
    expect(getSecond(1, 'hello', true)).toBe('hello');
    expect(getThird(1, 'hello', true)).toBe(true);
  });

  it('should work with objects and arrays', () => {
    const getFirst = nthArg(0);
    const getSecond = nthArg(1);

    const obj = { a: 1 };
    const arr = [1, 2, 3];

    expect(getFirst(obj, arr)).toBe(obj);
    expect(getSecond(obj, arr)).toBe(arr);
  });

  it('should work with null and undefined', () => {
    const getFirst = nthArg(0);
    const getSecond = nthArg(1);

    expect(getFirst(null, undefined)).toBe(null);
    expect(getSecond(null, undefined)).toBe(undefined);
  });

  it('should work with functions', () => {
    const getFirst = nthArg(0);
    const fn = () => 'hello';

    expect(getFirst(fn)).toBe(fn);
  });

  it('should default to 0 when no index provided', () => {
    const getFirst = nthArg();
    expect(getFirst('a', 'b', 'c')).toBe('a');
  });
});
