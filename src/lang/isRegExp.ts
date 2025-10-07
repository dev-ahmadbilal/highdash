/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a regexp object, else `false`
 *
 * @example
 * ```typescript
 * isRegExp(/abc/);
 * // => true
 *
 * isRegExp('/abc/');
 * // => false
 * ```
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}
