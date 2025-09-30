/**
 * Performs a same-value-zero comparison between two values to determine if they are equivalent.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if the values are equivalent, else `false`
 *
 * @example
 * ```typescript
 * const object = { 'a': 1 };
 * const other = { 'a': 1 };
 *
 * eq(object, object);
 * // => true
 *
 * eq(object, other);
 * // => false
 *
 * eq('a', 'a');
 * // => true
 *
 * eq('a', Object('a'));
 * // => false
 *
 * eq(NaN, NaN);
 * // => true
 * ```
 */
export function eq(value: unknown, other: unknown): boolean {
  return value === other || (value !== value && other !== other);
}
