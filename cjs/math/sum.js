"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
/**
 * Computes the sum of the values in `array`.
 *
 * @param array - The array to iterate over
 * @returns Returns the sum
 *
 * @example
 * ```typescript
 * sum([4, 2, 8, 6]);
 * // => 20
 * ```
 */
function sum(array) {
    if (!Array.isArray(array)) {
        return 0;
    }
    return array.reduce((acc, value) => {
        const num = Number(value);
        return acc + (isNaN(num) ? 0 : num);
    }, 0);
}
