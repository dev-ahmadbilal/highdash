/**
 * Gets the first element of `array`.
 *
 * @param array - The array to query
 * @returns Returns the first element of `array`
 *
 * @example
 * ```typescript
 * head([1, 2, 3]);
 * // => 1
 *
 * head([]);
 * // => undefined
 * ```
 */
export function head<T>(array: T[]): T | undefined {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  return array[0];
}
