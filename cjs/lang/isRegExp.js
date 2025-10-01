"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegExp = isRegExp;
/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a regexp object, else `false`
 *
 * @example
 * ```typescript
 * isRegExp(/abc/);
 * // => true
 *
 * isRegExp('/abc/');
 * // => false
 * ```
 */
function isRegExp(value) {
    return value instanceof RegExp;
}
