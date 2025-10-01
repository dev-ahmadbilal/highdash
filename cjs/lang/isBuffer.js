"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBuffer = isBuffer;
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
function isBuffer(value) {
    return (value !== null &&
        typeof value === 'object' &&
        typeof value.constructor === 'function' &&
        typeof value.constructor.isBuffer === 'function' &&
        value.constructor.isBuffer(value));
}
