/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring any additional arguments.
 *
 * @param func - The function to cap arguments for
 * @param n - The arity cap
 * @returns Returns the new capped function
 *
 * @example
 * ```typescript
 * const map = ary(Array.prototype.map, 1);
 * map(['6', '8', '10'], parseInt);
 * // => [6, 8, 10]
 * ```
 */
export function ary<T extends (...args: unknown[]) => unknown>(func: T, n: number = func.length): T {
  if (n < 0) {
    n = 0
  }

  return ((...args: Parameters<T>) => {
    return func(...args.slice(0, n))
  }) as T
}
