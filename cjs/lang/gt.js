"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gt = gt;
/**
 * Checks if `value` is greater than `other`.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if `value` is greater than `other`, else `false`
 *
 * @example
 * ```typescript
 * gt(3, 1);
 * // => true
 *
 * gt(3, 3);
 * // => false
 *
 * gt(1, 3);
 * // => false
 * ```
 */
function gt(value, other) {
    if (!(typeof value === 'number' && typeof other === 'number')) {
        return false;
    }
    return value > other;
}
