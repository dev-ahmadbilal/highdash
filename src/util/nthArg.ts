/**
 * Creates a function that gets the argument at index `n`.
 *
 * @param n - The index of the argument to return
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const func = nthArg(1);
 * func('a', 'b', 'c', 'd');
 * // => 'b'
 *
 * const func2 = nthArg(-2);
 * func2('a', 'b', 'c', 'd');
 * // => 'c'
 * ```
 */
export function nthArg<T = unknown>(n: number = 0): (...args: T[]) => T | undefined {
  return (...args: T[]): T | undefined => {
    const index = n < 0 ? args.length + n : n;
    return args[index];
  };
}
