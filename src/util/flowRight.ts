/**
 * This method is like `flow` except that it creates a function that invokes the given functions from right to left.
 *
 * @param funcs - The functions to invoke
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * function square(n) {
 *   return n * n;
 * }
 *
 * const addSquare = flowRight([square, add]);
 * addSquare(1, 2);
 * // => 9
 * ```
 */
export function flowRight<T extends unknown[]>(
  funcs: Array<((...args: T) => unknown) | ((...args: unknown[]) => unknown)>,
): (...args: T) => unknown {
  if (funcs.length === 0) {
    return (...args: T) => args[0];
  }

  if (funcs.length === 1) {
    return funcs[0] as (...args: T) => unknown;
  }

  return (...args: T): unknown => {
    let result = funcs[funcs.length - 1](...args);

    for (let i = funcs.length - 2; i >= 0; i--) {
      result = (funcs[i] as (value: unknown) => unknown)(result);
    }

    return result;
  };
}
