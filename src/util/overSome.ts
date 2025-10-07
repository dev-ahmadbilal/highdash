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
export function overSome<T extends unknown[]>(predicates: Array<(...args: T) => unknown>): (...args: T) => any {
  return (...args: T): any => {
    const results = predicates.map((predicate) => predicate(...args))
    // If any result is a Promise, handle asynchronously
    if (results.some((r) => r instanceof Promise)) {
      return Promise.all(results.map((r) => (r instanceof Promise ? r : Promise.resolve(r)))).then((vals) =>
        vals.some((v) => Boolean(v)),
      )
    }
    return results.some((v) => Boolean(v))
  }
}
