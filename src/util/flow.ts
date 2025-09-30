/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function,
 * where each successive invocation is supplied the return value of the previous.
 *
 * @param funcs - The functions to invoke
 * @returns Returns the new composite function
 *
 * @example
 * ```typescript
 * function square(n) {
 *   return n * n;
 * }
 *
 * const addSquare = flow([add, square]);
 * addSquare(1, 2);
 * // => 9
 * ```
 */
export function flow<T extends unknown[], R>(funcs: Array<(...args: T) => unknown>): (...args: T) => R {
  if (funcs.length === 0) {
    return (...args: T) => args[0] as R;
  }

  if (funcs.length === 1) {
    return funcs[0] as (...args: T) => R;
  }

  return (...args: T) => {
    let result: unknown = funcs[0](...args);
    for (let i = 1; i < funcs.length; i++) {
      result = (funcs[i] as any)(result);
    }
    return result as R;
  };
}
