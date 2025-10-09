/**
 * Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons.
 * The order and references of result values are determined by the first array.
 *
 * @param array - The array to inspect
 * @param values - The values to exclude
 * @returns Returns the new array of filtered values
 *
 * @example
 * ```typescript
 * difference([2, 1], [2, 3]);
 * // => [1]
 * ```
 */
export function difference<T>(array: T[], ...values: T[][]): T[] {
  if (!Array.isArray(array)) {
    return []
  }

  const excludeValues = new Set<T>()
  for (const valueArray of values) {
    if (Array.isArray(valueArray)) {
      for (const value of valueArray) {
        excludeValues.add(value)
      }
    }
  }

  return array.filter((item) => !excludeValues.has(item))
}
