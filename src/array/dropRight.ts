/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @param array - The array to query
 * @param n - The number of elements to drop
 * @returns Returns the slice of `array`
 *
 * @example
 * ```typescript
 * dropRight([1, 2, 3], 2);
 * // => [1]
 *
 * dropRight([1, 2, 3], 5);
 * // => []
 *
 * dropRight([1, 2, 3], 0);
 * // => [1, 2, 3]
 * ```
 */
export function dropRight<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array) || n <= 0) {
    return array || [];
  }
  return array.slice(0, -n);
}
