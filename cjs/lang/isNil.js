"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNil = isNil;
/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is nullish, else `false`
 *
 * @example
 * ```typescript
 * isNil(null);
 * // => true
 *
 * isNil(undefined);
 * // => true
 *
 * isNil(NaN);
 * // => false
 * ```
 */
function isNil(value) {
    return value === null || value === undefined;
}
