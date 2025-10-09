/**
 * Checks if `value` is a valid array-like length.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a valid length, else `false`
 *
 * @example
 * ```typescript
 * isLength(3);
 * // => true
 *
 * isLength(Number.MIN_VALUE);
 * // => false
 *
 * isLength(Infinity);
 * // => false
 * ```
 */
export function isLength(value: unknown): value is number {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER
}
