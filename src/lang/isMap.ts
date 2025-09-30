/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a map, else `false`
 *
 * @example
 * ```typescript
 * isMap(new Map);
 * // => true
 *
 * isMap(new WeakMap);
 * // => false
 * ```
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map;
}
