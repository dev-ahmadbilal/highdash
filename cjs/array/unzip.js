"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unzip = unzip;
/**
 * This method is like `zip` except that it accepts an array of grouped elements and creates an array regrouping the elements to their pre-zip configuration.
 *
 * @param array - The array of grouped elements to process
 * @returns Returns the new array of regrouped elements
 *
 * @example
 * ```typescript
 * const zipped = [['a', 1, true], ['b', 2, false]];
 * unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 * ```
 */
function unzip(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return [];
    }
    const maxLength = Math.max(...array.map((group) => group.length));
    const result = [];
    for (let i = 0; i < maxLength; i++) {
        result[i] = array.map((group) => group[i]);
    }
    return result;
}
