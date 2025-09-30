/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a set, else `false`
 *
 * @example
 * ```typescript
 * isSet(new Set);
 * // => true
 *
 * isSet(new WeakSet);
 * // => false
 * ```
 */
export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set;
}
