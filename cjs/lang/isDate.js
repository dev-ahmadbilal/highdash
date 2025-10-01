"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = isDate;
/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a date object, else `false`
 *
 * @example
 * ```typescript
 * isDate(new Date);
 * // => true
 *
 * isDate('Mon April 23 2012');
 * // => false
 * ```
 */
function isDate(value) {
    return value instanceof Date;
}
