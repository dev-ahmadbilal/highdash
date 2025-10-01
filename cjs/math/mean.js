"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mean = mean;
/**
 * Computes the mean of the values in `array`.
 *
 * @param array - The array to iterate over
 * @returns Returns the mean
 *
 * @example
 * ```typescript
 * mean([4, 2, 8, 6]);
 * // => 5
 * ```
 */
function mean(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return NaN;
    }
    const sum = array.reduce((acc, value) => acc + value, 0);
    return sum / array.length;
}
