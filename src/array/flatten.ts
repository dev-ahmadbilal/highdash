/**
 * Flattens `array` a single level deep.
 *
 * @param array - The array to flatten
 * @returns Returns the new flattened array
 *
 * @example
 * ```typescript
 * flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 * ```
 */
export function flatten<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    return []
  }

  return array.flat(1) as T[]
}
