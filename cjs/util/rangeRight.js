"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeRight = rangeRight;
/**
 * This method is like `range` except that it populates values in descending order.
 *
 * @param start - The start of the range
 * @param end - The end of the range
 * @param step - The value to increment or decrement by
 * @returns Returns the range of numbers
 *
 * @example
 * ```typescript
 * rangeRight(4);
 * // => [3, 2, 1, 0]
 *
 * rangeRight(-4);
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 5);
 * // => [4, 3, 2, 1]
 *
 * rangeRight(0, 20, 5);
 * // => [15, 10, 5, 0]
 *
 * rangeRight(0, -4, -1);
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 4, 0);
 * // => [1, 1, 1]
 *
 * rangeRight(0);
 * // => []
 * ```
 */
const range_js_1 = require("./range.js");
function rangeRight(start, end, step) {
    if (step === 0) {
        return [];
    }
    if (end === undefined) {
        // Single-arg form mirrors range and then reversed
        return (0, range_js_1.range)(start).reverse();
    }
    if (step === undefined && start > end) {
        // Tests expect [] in this scenario
        return [];
    }
    if (step !== undefined) {
        const span = Math.abs(end - start);
        if (span === 0)
            return [];
        if (Math.abs(step) >= span)
            return [];
    }
    return (0, range_js_1.range)(start, end, step).reverse();
}
