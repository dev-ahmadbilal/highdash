"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = compact;
/**
 * Creates an array with all falsy values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsy.
 *
 * @param array - The array to compact
 * @returns Returns the new array of filtered values
 *
 * @example
 * ```typescript
 * compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 * ```
 */
function compact(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return array.filter(Boolean);
}
