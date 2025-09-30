/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is nullish, else `false`
 *
 * @example
 * ```typescript
 * isNil(null);
 * // => true
 *
 * isNil(undefined);
 * // => true
 *
 * isNil(NaN);
 * // => false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
