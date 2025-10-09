/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an array, else `false`
 *
 * @example
 * ```typescript
 * isArray([1, 2, 3]);
 * // => true
 *
 * isArray(document.body.children);
 * // => false
 *
 * isArray('abc');
 * // => false
 * ```
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}
