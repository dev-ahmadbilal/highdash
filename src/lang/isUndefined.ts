/**
 * Checks if `value` is `undefined`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is undefined, else `false`
 *
 * @example
 * ```typescript
 * isUndefined(void 0);
 * // => true
 *
 * isUndefined(null);
 * // => false
 * ```
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
