/**
 * Creates an array excluding all given values using SameValueZero for equality comparisons.
 *
 * @param array - The array to inspect
 * @param values - The values to exclude
 * @returns Returns the new array of filtered values
 *
 * @example
 * ```typescript
 * without([2, 1, 2, 3], 1, 2);
 * // => [3]
 * ```
 */
export function without<T>(array: T[], ...values: T[]): T[] {
  if (!Array.isArray(array)) {
    return []
  }

  const valuesSet = new Set(values)
  return array.filter((item) => !valuesSet.has(item))
}
