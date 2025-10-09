import { debounce } from '../../src/core/debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce a function', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    debounced();
    debounced();
    debounced();

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call function with leading option', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { leading: true, trailing: false });

    debounced();
    expect(func).toHaveBeenCalledTimes(1);

    debounced();
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel debounced function', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    debounced();
    debounced.cancel();

    jest.advanceTimersByTime(100);

    expect(func).not.toHaveBeenCalled();
  });

  it('should flush debounced function', () => {
    const func = jest.fn().mockReturnValue('result');
    const debounced = debounce(func, 100);

    debounced();
    const result = debounced.flush();

    expect(func).toHaveBeenCalledTimes(1);
    expect(result).toBe('result');
  });

  it('should respect maxWait option', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { maxWait: 200 });

    debounced();
    debounced();
    debounced();

    jest.advanceTimersByTime(200);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should handle pending state', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    debounced();
    expect(debounced.pending()).toBe(true);

    jest.advanceTimersByTime(100);
    expect(debounced.pending()).toBe(false);
  });

  it('should handle maxWait with leading and trailing', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { leading: true, trailing: true, maxWait: 150 });

    debounced();
    expect(func).toHaveBeenCalledTimes(1); // Leading call

    debounced();
    debounced();

    jest.advanceTimersByTime(150);
    expect(func).toHaveBeenCalledTimes(2); // MaxWait call
  });

  it('should handle maxWait edge case with multiple calls', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { maxWait: 150 });

    debounced();
    jest.advanceTimersByTime(50);

    debounced();
    jest.advanceTimersByTime(50);

    debounced();
    jest.advanceTimersByTime(50); // Total: 150ms, should trigger maxWait

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should handle leading edge with maxWait', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { leading: true, maxWait: 150 });

    debounced();
    expect(func).toHaveBeenCalledTimes(1); // Leading call

    debounced();
    jest.advanceTimersByTime(150);
    expect(func).toHaveBeenCalledTimes(2); // MaxWait call
  });

  it('should handle trailing edge with maxWait', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { trailing: true, maxWait: 150 });

    debounced();
    debounced();
    jest.advanceTimersByTime(150);
    expect(func).toHaveBeenCalledTimes(1); // MaxWait call
  });

  it('should handle flush when timer is undefined', () => {
    const func = jest.fn().mockReturnValue('result');
    const debounced = debounce(func, 100);

    // Don't call debounced, just flush
    const result = debounced.flush();
    expect(result).toBeUndefined();
    expect(func).not.toHaveBeenCalled();
  });

  it('should handle cancel and reset state', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    debounced('arg1');
    debounced.cancel();

    // State should be reset
    expect(debounced.pending()).toBe(false);

    debounced('arg2');
    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('arg2');
  });

  it('should handle edge case with negative time differences', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    // Mock performance.now to return decreasing values (edge case)
    const originalNow = performance.now;
    let time = 1000;
    performance.now = jest.fn(() => time--);

    debounced();
    debounced(); // This should trigger shouldInvoke due to negative time difference

    performance.now = originalNow;
    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should handle maxWait with timer already set', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100, { maxWait: 150 });

    debounced();
    debounced(); // This should trigger the maxWait branch with timer already set

    jest.advanceTimersByTime(150);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should handle timer setting when timerId is undefined', () => {
    const func = jest.fn();
    const debounced = debounce(func, 100);

    debounced();
    debounced(); // This should set timer when timerId is undefined

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });
});
