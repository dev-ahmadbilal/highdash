"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubFalse = stubFalse;
/**
 * This method returns `false`.
 *
 * @returns Returns `false`
 *
 * @example
 * ```typescript
 * const falses = times(2, stubFalse);
 * console.log(falses);
 * // => [false, false]
 * ```
 */
function stubFalse() {
    return false;
}
