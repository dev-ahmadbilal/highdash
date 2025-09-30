/**
 * Gets all but the last element of `array`.
 *
 * @param array - The array to query
 * @returns Returns the slice of `array`
 *
 * @example
 * ```typescript
 * initial([1, 2, 3]);
 * // => [1, 2]
 *
 * initial([1]);
 * // => []
 *
 * initial([]);
 * // => []
 * ```
 */
export function initial<T>(array: T[]): T[] {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  return array.slice(0, -1);
}
