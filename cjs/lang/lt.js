"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lt = lt;
/**
 * Checks if `value` is less than `other`.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if `value` is less than `other`, else `false`
 *
 * @example
 * ```typescript
 * lt(1, 3);
 * // => true
 *
 * lt(3, 3);
 * // => false
 *
 * lt(3, 1);
 * // => false
 * ```
 */
function lt(value, other) {
    if (!(typeof value === 'number' && typeof other === 'number')) {
        return false;
    }
    return value < other;
}
