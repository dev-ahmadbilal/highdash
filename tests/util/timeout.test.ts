import { timeout } from '../../src/util/timeout.js';

describe('timeout', () => {
  it('should resolve when promise resolves before timeout', async () => {
    const promise = Promise.resolve('success');
    const result = await timeout(promise, 1000);
    expect(result).toBe('success');
  });

  it('should reject when promise rejects before timeout', async () => {
    const promise = Promise.reject(new Error('test error'));
    await expect(timeout(promise, 1000)).rejects.toThrow('test error');
  });

  it('should timeout with default reason', async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    const timeoutPromise = timeout(promise, 100);

    await expect(timeoutPromise).rejects.toThrow('Timeout');
  });

  it('should timeout with custom string reason', async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    const timeoutPromise = timeout(promise, 100, 'Custom timeout');

    await expect(timeoutPromise).rejects.toThrow('Custom timeout');
  });

  it('should timeout with custom Error reason', async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    const customError = new Error('Custom error');
    const timeoutPromise = timeout(promise, 100, customError);

    await expect(timeoutPromise).rejects.toThrow('Custom error');
  });

  it('should handle zero timeout', async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));
    const timeoutPromise = timeout(promise, 0);

    await expect(timeoutPromise).rejects.toThrow('Timeout');
  });

  it('should handle negative timeout', async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));
    const timeoutPromise = timeout(promise, -1000);

    await expect(timeoutPromise).rejects.toThrow('Timeout');
  });

  it('should clear timeout when promise resolves', async () => {
    const promise = Promise.resolve('success');
    const timeoutPromise = timeout(promise, 1000);

    const result = await timeoutPromise;
    expect(result).toBe('success');
  });

  it('should clear timeout when promise rejects', async () => {
    const promise = Promise.reject(new Error('test error'));
    const timeoutPromise = timeout(promise, 1000);

    await expect(timeoutPromise).rejects.toThrow('test error');
  });

  it('should handle promise that resolves after timeout', async () => {
    let resolvePromise: (value: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolvePromise = resolve;
    });

    const timeoutPromise = timeout(promise, 100);

    await expect(timeoutPromise).rejects.toThrow('Timeout');

    // Resolve the original promise after timeout
    resolvePromise!('late success');
  });

  it('should handle promise that rejects after timeout', async () => {
    let rejectPromise: (reason: Error) => void;
    const promise = new Promise<string>((_, reject) => {
      rejectPromise = reject;
    });

    const timeoutPromise = timeout(promise, 100);

    await expect(timeoutPromise).rejects.toThrow('Timeout');

    // Reject the original promise after timeout
    rejectPromise!(new Error('late error'));
  });

  it('should work with async functions', async () => {
    const asyncFn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return 'async success';
    };

    const result = await timeout(asyncFn(), 1000);
    expect(result).toBe('async success');
  });

  it('should work with fetch-like promises', async () => {
    const fetchPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ data: 'fetch result' }), 50);
    });

    const result = await timeout(fetchPromise, 1000);
    expect(result).toEqual({ data: 'fetch result' });
  });

  it('should handle multiple timeouts on same promise', async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));

    const timeout1 = timeout(promise, 100);
    const timeout2 = timeout(promise, 150);

    await expect(timeout1).rejects.toThrow('Timeout');
    await expect(timeout2).rejects.toThrow('Timeout');
  });
});
