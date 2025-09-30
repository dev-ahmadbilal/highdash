/**
 * Creates a function that checks if **any** of the `predicates` return truthy when invoked with the arguments it receives.
 *
 * @param predicates - The predicates to check
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const func = overSome([Boolean, isFinite]);
 * func('1');
 * // => true
 *
 * func(null);
 * // => true
 *
 * func(NaN);
 * // => false
 * ```
 */
export function overSome<T extends unknown[]>(predicates: Array<(...args: T) => boolean>): (...args: T) => boolean {
  return (...args: T): boolean => {
    return predicates.some((predicate) => predicate(...args));
  };
}
