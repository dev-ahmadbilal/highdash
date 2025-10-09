import { defer } from '../../src/function/defer';

describe('defer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('defers function execution', () => {
    const fn = jest.fn();
    defer(fn);

    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to deferred function', () => {
    const fn = jest.fn();
    defer(fn, 'arg1', 'arg2');

    jest.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('returns timer id', () => {
    const fn = jest.fn();
    const timerId = defer(fn);

    expect(typeof timerId).toBe('number');
  });
});
