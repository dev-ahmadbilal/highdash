import { pDebounce } from '../../src/util/pDebounce.js';

describe('pDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce function calls', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const debounced = pDebounce(fn, 100);

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    jest.advanceTimersByTime(100);

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
    expect(result1).toBe('result');
    expect(result2).toBe('result');
  });

  it('should support leading option', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const debounced = pDebounce(fn, 100, { leading: true });

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    const result1 = await promise1;
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
    expect(result1).toBe('result');

    jest.advanceTimersByTime(100);
    const result2 = await promise2;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(2);
    expect(result2).toBe('result');
  });

  it('should support trailing option', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const debounced = pDebounce(fn, 100, { trailing: true });

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    jest.advanceTimersByTime(100);

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
    expect(result1).toBe('result');
    expect(result2).toBe('result');
  });

  it('should handle function errors', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('test error'));
    const debounced = pDebounce(fn, 100);

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    jest.advanceTimersByTime(100);

    await expect(promise1).rejects.toThrow('test error');
    await expect(promise2).rejects.toThrow('test error');
  });

  it('should handle synchronous function errors', async () => {
    const fn = jest.fn().mockImplementation(() => {
      throw new Error('sync error');
    });
    const debounced = pDebounce(fn, 100);

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    jest.advanceTimersByTime(100);

    await expect(promise1).rejects.toThrow('sync error');
    await expect(promise2).rejects.toThrow('sync error');
  });

  it('should handle non-promise return values', async () => {
    const fn = jest.fn().mockReturnValue('sync result');
    const debounced = pDebounce(fn, 100);

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    jest.advanceTimersByTime(100);

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
    expect(result1).toBe('sync result');
    expect(result2).toBe('sync result');
  });

  it('should handle multiple calls with different arguments', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const debounced = pDebounce(fn, 100);

    const promise1 = debounced(1);
    const promise2 = debounced(2);
    const promise3 = debounced(3);

    jest.advanceTimersByTime(100);

    const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
    expect(result1).toBe('result');
    expect(result2).toBe('result');
    expect(result3).toBe('result');
  });

  it('should handle zero wait time', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const debounced = pDebounce(fn, 0);

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    jest.advanceTimersByTime(0);

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
    expect(result1).toBe('result');
    expect(result2).toBe('result');
  });

  it('should handle both leading and trailing false', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const debounced = pDebounce(fn, 100, { leading: false, trailing: false });

    const promise1 = debounced(1);
    const promise2 = debounced(2);

    jest.advanceTimersByTime(100);

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(fn).not.toHaveBeenCalled();
    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
  });
});
