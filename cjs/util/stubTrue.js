"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubTrue = stubTrue;
/**
 * This method returns `true`.
 *
 * @returns Returns `true`
 *
 * @example
 * ```typescript
 * const trues = times(2, stubTrue);
 * console.log(trues);
 * // => [true, true]
 * ```
 */
function stubTrue() {
    return true;
}
