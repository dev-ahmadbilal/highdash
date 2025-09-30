/**
 * This method is like `curry` except that arguments are applied to `func` in the manner of `partialRight` instead of `partial`.
 *
 * @param func - The function to curry
 * @param arity - The arity of `func`
 * @returns Returns the new curried function
 *
 * @example
 * ```typescript
 * const abc = (a: string, b: string, c: string) => [a, b, c];
 * const curried = curryRight(abc);
 *
 * curried('c')('b')('a');
 * // => ['a', 'b', 'c']
 *
 * curried('c', 'b')('a');
 * // => ['a', 'b', 'c']
 * ```
 */
export function curryRight<T extends (...args: unknown[]) => unknown>(func: T, arity: number = func.length): T {
  if (arity < 0) {
    arity = 0;
  }

  function curried(...args: unknown[]): unknown {
    if (args.length >= arity) {
      return func(...args);
    }

    return (...nextArgs: unknown[]) => {
      return curried(...nextArgs, ...args);
    };
  }

  return curried as T;
}
