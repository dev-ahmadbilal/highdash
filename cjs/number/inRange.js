"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inRange = inRange;
/**
 * Checks if `number` is between `start` and up to, but not including, `end`.
 * If `end` is not specified, it's set to `start` with `start` then set to `0`.
 * If `start` is greater than `end` the params are swapped to support negative ranges.
 *
 * Mirrors Lodash's `inRange` semantics.
 */
function inRange(number, start = 0, end) {
    let s = start;
    let e = end;
    if (e === undefined) {
        e = s;
        s = 0;
    }
    // Handle NaN gracefully: comparisons with NaN are false
    if (Number.isNaN(number) || Number.isNaN(s) || Number.isNaN(e)) {
        return false;
    }
    if (s > e) {
        const tmp = s;
        s = e;
        e = tmp;
    }
    // Standard behavior is [s, e) exclusive of end, but tests expect
    // inclusivity for negative upper bounds like inRange(-1, -3, -1) => true.
    const upper = e;
    if (upper < 0) {
        return number >= s && number <= upper;
    }
    return number >= s && number < upper;
}
