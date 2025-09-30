import { once } from '../../src/function/once';

describe('once', () => {
  it('should call function only once', () => {
    const func = jest.fn().mockReturnValue('result');
    const onceFunc = once(func);

    const result1 = onceFunc();
    const result2 = onceFunc();
    const result3 = onceFunc();

    expect(func).toHaveBeenCalledTimes(1);
    expect(result1).toBe('result');
    expect(result2).toBe('result');
    expect(result3).toBe('result');
  });

  it('should pass arguments to function', () => {
    const func = jest.fn().mockReturnValue('result');
    const onceFunc = once(func);

    onceFunc('arg1', 'arg2');

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should preserve this context', () => {
    const obj = { value: 42 };
    const func = jest.fn(function() { return this.value; });
    const onceFunc = once(func);

    const result = onceFunc.call(obj);

    expect(result).toBe(42);
  });
});
