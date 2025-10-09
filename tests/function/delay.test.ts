import { delay } from '../../src/function/delay';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = jest.fn();
    delay(fn, 100);

    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to delayed function', () => {
    const fn = jest.fn();
    delay(fn, 100, 'arg1', 'arg2');

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('returns timer id', () => {
    const fn = jest.fn();
    const timerId = delay(fn, 100);

    expect(typeof timerId).toBe('number');
  });

  it('handles zero delay', () => {
    const fn = jest.fn();
    delay(fn, 0);

    jest.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
