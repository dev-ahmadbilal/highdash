"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
/**
 * Converts the first character of `string` to upper case and the remaining to lower case.
 *
 * @param string - The string to capitalize
 * @returns Returns the capitalized string
 *
 * @example
 * ```typescript
 * capitalize('FRED');
 * // => 'Fred'
 *
 * capitalize('fred');
 * // => 'Fred'
 * ```
 */
function capitalize(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
