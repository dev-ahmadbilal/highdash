/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 * The throttled function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them.
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout
 * @param options.trailing - Specify invoking on the trailing edge of the timeout
 * @returns Returns the new throttled function
 *
 * @example
 * ```typescript
 * const throttled = throttle(() => console.log('Hello'), 1000);
 * throttled(); // Will log 'Hello' immediately
 * throttled(); // Ignored
 * throttled(); // Ignored
 * // After 1000ms, the next call will be allowed
 * ```
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 0,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
): T & { cancel: () => void; flush: () => ReturnType<T> | undefined; pending: () => boolean } {
  const { leading = true, trailing = true } = options;

  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}

// Re-export debounce for internal use
import { debounce } from './debounce.js';
