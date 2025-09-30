/**
 * Creates a function that invokes `iteratees` with the arguments it receives and returns their results.
 *
 * @param iteratees - The iteratees to invoke
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const func = over([Math.max, Math.min]);
 * func(1, 2, 3, 4);
 * // => [4, 1]
 * ```
 */
export function over<T extends unknown[]>(iteratees: Array<(...args: T) => unknown>): (...args: T) => unknown[] {
  return (...args: T): unknown[] => {
    return iteratees.map((iteratee) => iteratee(...args));
  };
}
