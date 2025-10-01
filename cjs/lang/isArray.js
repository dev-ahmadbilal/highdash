"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = isArray;
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an array, else `false`
 *
 * @example
 * ```typescript
 * isArray([1, 2, 3]);
 * // => true
 *
 * isArray(document.body.children);
 * // => false
 *
 * isArray('abc');
 * // => false
 * ```
 */
function isArray(value) {
    return Array.isArray(value);
}
