/**
 * Checks if `value` is classified as a typed array.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a typed array, else `false`
 *
 * @example
 * ```typescript
 * isTypedArray(new Uint8Array);
 * // => true
 *
 * isTypedArray([]);
 * // => false
 * ```
 */
export function isTypedArray(value: unknown): value is TypedArray {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as any).constructor === 'function' &&
    typeof (value as any).BYTES_PER_ELEMENT === 'number' &&
    ArrayBuffer.isView(value)
  )
}

// Type definition for TypedArray
type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
