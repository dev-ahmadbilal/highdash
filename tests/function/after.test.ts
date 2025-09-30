import { after } from '../../src/function/after';

describe('after', () => {
  it('should call function after n calls', () => {
    const mockFn = jest.fn();
    const afterFn = after(3, mockFn);

    afterFn();
    expect(mockFn).not.toHaveBeenCalled();

    afterFn();
    expect(mockFn).not.toHaveBeenCalled();

    afterFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    afterFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments to the function', () => {
    const mockFn = jest.fn();
    const afterFn = after(1, mockFn);

    afterFn('arg1', 'arg2');
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should return the result of the function', () => {
    const mockFn = jest.fn().mockReturnValue('result');
    const afterFn = after(1, mockFn);

    const result = afterFn();
    expect(result).toBe('result');
  });
});
