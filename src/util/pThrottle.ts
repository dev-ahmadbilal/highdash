/**
 * Promise-aware throttle. Limits invocation rate to at most once per `wait`.
 *
 * @example
 * const throttled = pThrottle(async (x: number) => x, 200);
 * await throttled(1);
 */
import { pDebounce } from './pDebounce.js';

export function pThrottle<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  options: { leading?: boolean; trailing?: boolean } = {},
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  const { leading = true, trailing = true } = options;
  // Simulate throttle via debounce pattern for promises
  return pDebounce(fn, wait, { leading, trailing });
}
