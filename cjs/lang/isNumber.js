"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = isNumber;
/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a number, else `false`
 *
 * @example
 * ```typescript
 * isNumber(3);
 * // => true
 *
 * isNumber(Number.MIN_VALUE);
 * // => true
 *
 * isNumber(Infinity);
 * // => true
 *
 * isNumber('3');
 * // => false
 * ```
 */
function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}
