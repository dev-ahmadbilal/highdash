/**
 * Removes all given values from `array` using SameValueZero for equality comparisons.
 *
 * @param array - The array to modify
 * @param values - The values to remove
 * @returns Returns `array`
 *
 * @example
 * ```typescript
 * const array = ['a', 'b', 'c', 'a', 'b', 'c'];
 * pull(array, 'a', 'c');
 * console.log(array);
 * // => ['b', 'b']
 * ```
 */
export function pull<T>(array: T[], ...values: T[]): T[] {
  if (!Array.isArray(array)) {
    return array
  }

  const valuesSet = new Set(values)
  let writeIndex = 0

  for (let readIndex = 0; readIndex < array.length; readIndex++) {
    if (!valuesSet.has(array[readIndex])) {
      array[writeIndex] = array[readIndex]
      writeIndex++
    }
  }

  array.length = writeIndex
  return array
}
