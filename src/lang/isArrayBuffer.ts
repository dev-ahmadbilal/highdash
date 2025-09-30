/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an `ArrayBuffer`, else `false`
 *
 * @example
 * ```typescript
 * isArrayBuffer(new ArrayBuffer(2));
 * // => true
 *
 * isArrayBuffer(new Array(2));
 * // => false
 * ```
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return value !== null && typeof value === 'object' && value.constructor === ArrayBuffer;
}
