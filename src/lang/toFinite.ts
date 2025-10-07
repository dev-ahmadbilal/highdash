/**
 * Converts `value` to a finite number.
 *
 * @param value - The value to convert
 * @returns Returns the converted number
 *
 * @example
 * ```typescript
 * toFinite(3.2);
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2');
 * // => 3.2
 * ```
 */
export function toFinite(value: unknown): number {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 0
    }
    if (isFinite(value)) {
      // Normalize -0 to 0
      return Object.is(value, -0) ? 0 : value
    }
    return value > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed.length === 0) return 0
    const parsed = Number(trimmed)
    if (Number.isFinite(parsed)) return parsed
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  if (value === null || value === undefined) {
    return 0
  }

  if (typeof value === 'bigint') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
    return n > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE
  }

  if (typeof value === 'object' && value !== null) {
    const primitive = (value as any).valueOf?.() ?? value
    const num = typeof primitive === 'object' ? Number(String(primitive)) : Number(primitive)
    if (Number.isFinite(num)) return num
  }

  return 0
}
