/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a boolean, else `false`
 *
 * @example
 * ```typescript
 * isBoolean(false);
 * // => true
 *
 * isBoolean(null);
 * // => false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}
