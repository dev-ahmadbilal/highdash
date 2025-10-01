import { retry } from '../../src/util/retry.js';

describe('retry', () => {

  it('should retry on failure', async () => {
    let attempts = 0;
    const fn = jest.fn().mockImplementation(async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error('test error');
      }
      return 'success';
    });

    const result = await retry(fn, { retries: 3, minTimeout: 10 });

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should fail after max retries', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('persistent error'));

    await expect(retry(fn, { retries: 2, minTimeout: 10 })).rejects.toThrow('persistent error');
    expect(fn).toHaveBeenCalledTimes(3); // initial + 2 retries
  });

  it('should succeed on first try', async () => {
    const fn = jest.fn().mockResolvedValue('success');

    const result = await retry(fn, { retries: 3, minTimeout: 10 });

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle zero retries', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('test error'));

    await expect(retry(fn, { retries: 0 })).rejects.toThrow('test error');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle negative retries', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('test error'));

    await expect(retry(fn, { retries: -1 })).rejects.toThrow('test error');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle zero minTimeout', async () => {
    let attempts = 0;
    const fn = jest.fn().mockImplementation(async () => {
      attempts++;
      if (attempts < 2) {
        throw new Error('test error');
      }
      return 'success';
    });

    const result = await retry(fn, { retries: 2, minTimeout: 0 });

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
