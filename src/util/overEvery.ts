/**
 * Creates a function that checks if **all** of the `predicates` return truthy when invoked with the arguments it receives.
 *
 * @param predicates - The predicates to check
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const func = overEvery([Boolean, isFinite]);
 * func('1');
 * // => true
 *
 * func(null);
 * // => false
 *
 * func(NaN);
 * // => false
 * ```
 */
export function overEvery<T extends unknown[]>(predicates: Array<(...args: T) => boolean>): (...args: T) => boolean {
  return (...args: T): boolean => {
    return predicates.every((predicate) => predicate(...args));
  };
}
