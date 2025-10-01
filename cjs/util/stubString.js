"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubString = stubString;
/**
 * This method returns an empty string.
 *
 * @returns Returns an empty string
 *
 * @example
 * ```typescript
 * const strings = times(2, stubString);
 * console.log(strings);
 * // => ['', '']
 * ```
 */
function stubString() {
    return '';
}
