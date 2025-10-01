"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = isString;
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a string, else `false`
 *
 * @example
 * ```typescript
 * isString('abc');
 * // => true
 *
 * isString(1);
 * // => false
 * ```
 */
function isString(value) {
    return typeof value === 'string';
}
