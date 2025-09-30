/**
 * This method returns a new empty array.
 *
 * @returns Returns the new empty array
 *
 * @example
 * ```typescript
 * const arrays = times(2, stubArray);
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 * ```
 */
export function stubArray(): unknown[] {
  return [];
}
