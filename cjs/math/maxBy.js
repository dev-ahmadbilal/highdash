"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxBy = maxBy;
/**
 * This method is like `max` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.
 * The iteratee is invoked with one argument: (value).
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the maximum value
 *
 * @example
 * ```typescript
 * const objects = [{ 'n': 1 }, { 'n': 2 }];
 * maxBy(objects, o => o.n);
 * // => { 'n': 2 }
 *
 * maxBy(objects, 'n');
 * // => { 'n': 2 }
 * ```
 */
function maxBy(array, iteratee) {
    if (!Array.isArray(array) || array.length === 0) {
        return undefined;
    }
    const getValue = typeof iteratee === 'function' ? iteratee : (item) => Number(item[iteratee]);
    let maxValue = getValue(array[0]);
    let maxItem = array[0];
    for (let i = 1; i < array.length; i++) {
        const value = getValue(array[i]);
        if (value > maxValue) {
            maxValue = value;
            maxItem = array[i];
        }
    }
    return maxItem;
}
