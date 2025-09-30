import { constant } from '../../src/util/constant';

describe('constant', () => {
  it('should return a function that returns the value', () => {
    const func = constant(42);
    expect(func()).toBe(42);
  });

  it('should work with objects', () => {
    const obj = { a: 1 };
    const func = constant(obj);
    expect(func()).toBe(obj);
  });

  it('should work with arrays', () => {
    const arr = [1, 2, 3];
    const func = constant(arr);
    expect(func()).toBe(arr);
  });

  it('should work with functions', () => {
    const fn = () => 'test';
    const func = constant(fn);
    expect(func()).toBe(fn);
  });
});
