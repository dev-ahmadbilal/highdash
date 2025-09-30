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
  ...funcs: Array<((...args: T) => unknown) | ((...args: unknown[]) => unknown)>
): (...args: T) => unknown {
  if (!funcs || funcs.length === 0) {
    return (...args: T) => args[0];
  }

  if (funcs.length === 1) {
    const single = funcs[0] as (...args: T) => unknown;
    return (...args: T) => single(...args);
  }

  return (...args: T): unknown => {
    let result: unknown = (funcs[funcs.length - 1] as (...args: T) => unknown)(...args);
    for (let i = funcs.length - 2; i >= 0; i--) {
      const fn = funcs[i] as (value: unknown) => unknown;
      if (result instanceof Promise) {
        result = (result as Promise<unknown>).then((val) => fn(val));
      } else {
        result = fn(result);
      }
    }
    return result;
  };
}
