/**
 * Checks if `value` is a buffer.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a buffer, else `false`
 *
 * @example
 * ```typescript
 * isBuffer(Buffer.alloc(2));
 * // => true
 *
 * isBuffer(new Uint8Array(2));
 * // => false
 * ```
 */
export function isBuffer(value: unknown): value is Buffer {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as any).constructor === 'function' &&
    typeof (value as any).constructor.isBuffer === 'function' &&
    (value as any).constructor.isBuffer(value)
  )
}
