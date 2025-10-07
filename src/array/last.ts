/**
 * Gets the last element of `array`.
 *
 * @param array - The array to query
 * @returns Returns the last element of `array`
 *
 * @example
 * ```typescript
 * last([1, 2, 3]);
 * // => 3
 *
 * last([]);
 * // => undefined
 * ```
 */
export function last<T>(array: T[]): T | undefined {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined
  }
  return array[array.length - 1]
}
