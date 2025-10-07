/**
 * Creates a function that invokes `func` with the array of arguments provided to the created function.
 *
 * @param func - The function to spread arguments over
 * @param start - The start position of spread
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const say = spread((who, what) => who + ' says ' + what);
 * say(['fred', 'hello']);
 * // => 'fred says hello'
 * ```
 */
export function spread<T extends (...args: unknown[]) => unknown>(func: T, start: number = 0): T {
  return ((array: unknown[]) => {
    return func(...array.slice(start))
  }) as T
}
