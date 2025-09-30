/**
 * Creates an array of unique values, in order, from all given arrays using SameValueZero for equality comparisons.
 *
 * @param arrays - The arrays to inspect
 * @returns Returns the new array of combined values
 *
 * @example
 * ```typescript
 * union([2], [1, 2]);
 * // => [2, 1]
 * ```
 */
export function union<T>(...arrays: T[][]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];

  for (const array of arrays) {
    if (Array.isArray(array)) {
      for (const item of array) {
        if (!seen.has(item)) {
          seen.add(item);
          result.push(item);
        }
      }
    }
  }

  return result;
}
