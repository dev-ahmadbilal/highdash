/**
 * Recursively flattens `array`.
 *
 * @param array - The array to flatten
 * @returns Returns the new flattened array
 *
 * @example
 * ```typescript
 * flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 * ```
 */
export function flattenDeep<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    return []
  }

  return array.flat(Infinity) as T[]
}
