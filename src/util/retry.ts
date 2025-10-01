export interface RetryOptions {
  retries?: number;
  factor?: number;
  minTimeout?: number;
  maxTimeout?: number;
  signal?: AbortSignal;
}

export function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { retries = 3, factor = 2, minTimeout = 100, maxTimeout = 2000, signal } = options;
  let attempt = 0;

  return new Promise<T>((resolve, reject) => {
    const run = () => {
      if (signal?.aborted) {
        reject(signal.reason ?? new Error('Aborted'));
        return;
      }
      fn().then(resolve, (err) => {
        if (attempt >= retries) {
          reject(err);
          return;
        }
        const ms = Math.min(maxTimeout, Math.floor(minTimeout * Math.pow(factor, attempt)));
        attempt++;
        setTimeout(run, ms);
      });
    };
    run();
  });
}
