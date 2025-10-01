/**
 * Wraps a promise with a timeout. Rejects after `ms` with the given reason.
 *
 * @example
 * await timeout(fetch(url), 5000, 'Request timed out');
 */
export function timeout<T>(promise: Promise<T>, ms: number, reason: string | Error = 'Timeout'): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const t = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(typeof reason === 'string' ? new Error(reason) : reason), ms);
  });
  return Promise.race([promise.finally(() => clearTimeout(timer!)), t]) as Promise<T>;
}
