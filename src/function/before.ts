/**
 * Creates a function that invokes `func`, with the `this` binding and arguments of the created function, while it's called less than `n` times.
 * Subsequent calls to the created function return the result of the last `func` invocation.
 *
 * @param n - The number of calls at which `func` is no longer invoked
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 *
 * @example
 * ```typescript
 * const add = (a: number, b: number) => a + b;
 * const limitedAdd = before(3, add);
 *
 * limitedAdd(1, 2);
 * // => 3
 *
 * limitedAdd(2, 3);
 * // => 5
 *
 * limitedAdd(3, 4);
 * // => 5 (result of last invocation)
 * ```
 */
export function before<T extends (...args: unknown[]) => unknown>(n: number, func: T): T {
  let remaining = n
  let lastResult: ReturnType<T> | undefined = undefined
  const singleInvoke = n === 1

  return ((...args: Parameters<T>) => {
    if (singleInvoke) {
      if (remaining === 1) {
        remaining = 0
        return func(...args) as ReturnType<T>
      }
      return undefined as unknown as ReturnType<T>
    }
    // n > 1: allow n-1 invocations, then return cached last result
    if (remaining > 1) {
      remaining -= 1
      lastResult = func(...args) as ReturnType<T>
      return lastResult
    }
    return lastResult as ReturnType<T>
  }) as T
}
