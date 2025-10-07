/**
 * Checks if `value` is less than `other`.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if `value` is less than `other`, else `false`
 *
 * @example
 * ```typescript
 * lt(1, 3);
 * // => true
 *
 * lt(3, 3);
 * // => false
 *
 * lt(3, 1);
 * // => false
 * ```
 */
export function lt(value: unknown, other: unknown): boolean {
  if (!(typeof value === 'number' && typeof other === 'number')) {
    return false
  }
  return value < other
}
