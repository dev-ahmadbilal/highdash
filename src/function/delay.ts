/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are provided to `func` when it's invoked.
 *
 * @param func - The function to delay
 * @param wait - The number of milliseconds to delay invocation
 * @param args - The arguments to invoke `func` with
 * @returns Returns the timer id
 *
 * @example
 * ```typescript
 * delay(text => console.log(text), 1000, 'later');
 * // => Logs 'later' after one second
 * ```
 */
export function delay<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  ...args: Parameters<T>
): NodeJS.Timeout {
  return setTimeout(() => func(...args), wait)
}
