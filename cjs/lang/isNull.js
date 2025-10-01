"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNull = isNull;
/**
 * Checks if `value` is `null`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is null, else `false`
 *
 * @example
 * ```typescript
 * isNull(null);
 * // => true
 *
 * isNull(void 0);
 * // => false
 * ```
 */
function isNull(value) {
    return value === null;
}
