/**
 * Checks if `value` is `null`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is null, else `false`
 *
 * @example
 * ```typescript
 * isNull(null);
 * // => true
 *
 * isNull(void 0);
 * // => false
 * ```
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
