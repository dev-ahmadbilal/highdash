/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 *
 * @param arrays - The arrays to process
 * @returns Returns the new array of grouped elements
 *
 * @example
 * ```typescript
 * zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 * ```
 */
export function zip<T extends unknown[]>(...arrays: T[]): T[number][][] {
  if (arrays.length === 0) {
    return []
  }

  // Filter out non-arrays and get valid arrays
  const validArrays = arrays.filter((arr) => Array.isArray(arr))
  if (validArrays.length === 0) {
    return []
  }

  // If any array is empty, return empty result
  if (validArrays.some((arr) => arr.length === 0)) {
    return []
  }

  const maxLength = Math.max(...validArrays.map((arr) => arr.length))
  const result: T[number][][] = []

  for (let i = 0; i < maxLength; i++) {
    const group: T[number][] = []
    for (const array of arrays) {
      group.push(Array.isArray(array) && i < array.length ? array[i] : (undefined as T[number]))
    }
    result.push(group)
  }

  return result
}
