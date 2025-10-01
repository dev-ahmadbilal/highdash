"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTypedArray = isTypedArray;
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
function isTypedArray(value) {
    return (value !== null &&
        typeof value === 'object' &&
        typeof value.constructor === 'function' &&
        typeof value.BYTES_PER_ELEMENT === 'number' &&
        ArrayBuffer.isView(value));
}
