/**
 * Creates a function that iterates over `pairs` and invokes the corresponding function of the first predicate to return truthy.
 *
 * @param pairs - The predicate-function pairs
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const func = cond([
 *   [matches({ 'a': 1 }), () => 'matches A'],
 *   [conforms({ 'b': isNumber }), () => 'matches B'],
 *   [() => true, () => 'no match']
 * ]);
 *
 * func({ 'a': 1, 'b': 2 });
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 });
 * // => 'matches B'
 *
 * func({ 'a': '1' });
 * // => 'no match'
 * ```
 */
export function cond<T extends unknown[], R>(
  pairs: Array<[((...args: T) => boolean) | ((...args: T) => boolean)[], (...args: T) => R]>,
): (...args: T) => R | undefined {
  return (...args: T): R | undefined => {
    for (const [predicate, func] of pairs) {
      if (Array.isArray(predicate)) {
        // Multiple predicates (AND condition)
        if (predicate.every((pred) => pred(...args))) {
          return func(...args);
        }
      } else {
        // Single predicate
        if (predicate(...args)) {
          return func(...args);
        }
      }
    }
    return undefined;
  };
}
