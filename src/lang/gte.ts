/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if `value` is greater than or equal to `other`, else `false`
 *
 * @example
 * ```typescript
 * gte(3, 1);
 * // => true
 *
 * gte(3, 3);
 * // => true
 *
 * gte(1, 3);
 * // => false
 * ```
 */
export function gte(value: unknown, other: unknown): boolean {
  if (!(typeof value === 'number' && typeof other === 'number')) {
    return false;
  }
  return value >= other;
}
