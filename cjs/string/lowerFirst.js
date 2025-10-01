"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerFirst = lowerFirst;
/**
 * Converts the first character of `string` to lower case.
 *
 * @param string - The string to convert
 * @returns Returns the converted string
 *
 * @example
 * ```typescript
 * lowerFirst('Fred');
 * // => 'fred'
 *
 * lowerFirst('FRED');
 * // => 'fRED'
 * ```
 */
function lowerFirst(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return '';
    }
    return string.charAt(0).toLowerCase() + string.slice(1);
}
