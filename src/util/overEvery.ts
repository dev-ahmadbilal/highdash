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
export function overEvery<T extends unknown[]>(predicates: Array<(...args: T) => unknown>): (...args: T) => any {
  return (...args: T): any => {
    if (predicates.length === 0) return true
    const results = predicates.map((predicate) => predicate(...args))
    if (results.some((r) => r instanceof Promise)) {
      return Promise.all(results.map((r) => (r instanceof Promise ? r : Promise.resolve(r)))).then((vals) =>
        vals.every((v) => Boolean(v)),
      )
    }
    return results.every((v) => Boolean(v))
  }
}
