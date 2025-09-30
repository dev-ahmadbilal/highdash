import { throttle } from '../../src/core/throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should throttle a function', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    throttled();

    expect(func).toHaveBeenCalledTimes(3);
  });

  it('should call function with leading option', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100, { leading: true });

    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call function with trailing option', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100, { trailing: true });

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should cancel throttled function', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled.cancel();

    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });
});
