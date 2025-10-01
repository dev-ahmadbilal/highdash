"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefined = isUndefined;
/**
 * Checks if `value` is `undefined`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is undefined, else `false`
 *
 * @example
 * ```typescript
 * isUndefined(void 0);
 * // => true
 *
 * isUndefined(null);
 * // => false
 * ```
 */
function isUndefined(value) {
    return value === undefined;
}
