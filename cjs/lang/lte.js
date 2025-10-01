"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lte = lte;
/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if `value` is less than or equal to `other`, else `false`
 *
 * @example
 * ```typescript
 * lte(1, 3);
 * // => true
 *
 * lte(3, 3);
 * // => true
 *
 * lte(3, 1);
 * // => false
 * ```
 */
function lte(value, other) {
    if (!(typeof value === 'number' && typeof other === 'number')) {
        return false;
    }
    return value <= other;
}
