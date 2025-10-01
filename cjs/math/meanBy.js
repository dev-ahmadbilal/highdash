"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meanBy = meanBy;
/**
 * This method is like `mean` except that it accepts `iteratee` which is invoked for each element in `array` to generate the value to be averaged.
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the mean
 *
 * @example
 * ```typescript
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 * meanBy(objects, o => o.n);
 * // => 5
 * ```
 */
function meanBy(array, iteratee) {
    if (!Array.isArray(array) || array.length === 0) {
        return NaN;
    }
    const getValue = typeof iteratee === 'function' ? iteratee : (item) => item[iteratee];
    const sum = array.reduce((acc, value) => acc + getValue(value), 0);
    return sum / array.length;
}
