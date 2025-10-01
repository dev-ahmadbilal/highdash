"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLength = isLength;
/**
 * Checks if `value` is a valid array-like length.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a valid length, else `false`
 *
 * @example
 * ```typescript
 * isLength(3);
 * // => true
 *
 * isLength(Number.MIN_VALUE);
 * // => false
 *
 * isLength(Infinity);
 * // => false
 * ```
 */
function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
}
