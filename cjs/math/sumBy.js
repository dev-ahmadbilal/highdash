"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumBy = sumBy;
/**
 * This method is like `sum` except that it accepts `iteratee` which is invoked for each element in `array` to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the sum
 *
 * @example
 * ```typescript
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 * sumBy(objects, o => o.n);
 * // => 20
 *
 * sumBy(objects, 'n');
 * // => 20
 * ```
 */
function sumBy(array, iteratee) {
    if (!Array.isArray(array)) {
        return 0;
    }
    const getValue = typeof iteratee === 'function' ? iteratee : (item) => Number(item[iteratee]);
    return array.reduce((acc, value) => {
        const num = getValue(value);
        return acc + (isNaN(num) ? 0 : num);
    }, 0);
}
