"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meanBy = meanBy;
const get_js_1 = require("../object/get.js");
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
    let getValue;
    if (typeof iteratee === 'function') {
        getValue = iteratee;
    }
    else {
        const path = iteratee;
        if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
            // Simple property access
            getValue = (item) => item[path];
        }
        else {
            // Complex path
            getValue = (item) => (0, get_js_1.get)(item, path);
        }
    }
    const sum = array.reduce((acc, value) => {
        const val = getValue(value);
        // Handle undefined as 0, non-numeric values as NaN
        if (val === undefined)
            return acc + 0;
        if (typeof val !== 'number' || isNaN(val))
            return NaN;
        return acc + val;
    }, 0);
    return sum / array.length;
}
