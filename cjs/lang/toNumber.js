"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumber = toNumber;
/**
 * Converts `value` to a number.
 *
 * @param value - The value to convert
 * @returns Returns the converted number
 *
 * @example
 * ```typescript
 * toNumber(3.2);
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * toNumber(Infinity);
 * // => Infinity
 *
 * toNumber('3.2');
 * // => 3.2
 * ```
 */
function toNumber(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    }
    if (typeof value === 'boolean') {
        return value ? 1 : 0;
    }
    if (value === null || value === undefined) {
        return 0;
    }
    if (typeof value === 'object' && value !== null) {
        // Try valueOf first, then toString
        if (typeof value.valueOf === 'function') {
            const valueOfResult = value.valueOf();
            if (typeof valueOfResult === 'number') {
                return valueOfResult;
            }
        }
        const stringValue = String(value);
        const parsed = parseFloat(stringValue);
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
}
