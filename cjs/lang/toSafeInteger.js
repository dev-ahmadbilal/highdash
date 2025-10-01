"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSafeInteger = toSafeInteger;
/**
 * Converts `value` to a safe integer.
 *
 * @param value - The value to convert
 * @returns Returns the converted integer
 *
 * @example
 * ```typescript
 * toSafeInteger(3.2);
 * // => 3
 *
 * toSafeInteger(Number.MIN_VALUE);
 * // => 0
 *
 * toSafeInteger(Infinity);
 * // => 9007199254740991
 *
 * toSafeInteger('3.2');
 * // => 3
 * ```
 */
function toSafeInteger(value) {
    const integer = toInteger(value);
    if (integer < Number.MIN_SAFE_INTEGER) {
        return Number.MIN_SAFE_INTEGER;
    }
    if (integer > Number.MAX_SAFE_INTEGER) {
        return Number.MAX_SAFE_INTEGER;
    }
    return integer;
}
/**
 * Converts `value` to an integer.
 */
function toInteger(value) {
    const finite = toFinite(value);
    if (finite === 0) {
        return 0;
    }
    if (finite === Number.MAX_VALUE || finite === -Number.MAX_VALUE) {
        const sign = finite < 0 ? -1 : 1;
        return sign * Number.MAX_VALUE;
    }
    const int = finite < 0 ? -Math.floor(Math.abs(finite)) : Math.floor(finite);
    return Object.is(int, -0) ? 0 : int;
}
/**
 * Converts `value` to a finite number.
 */
function toFinite(value) {
    var _a, _b, _c;
    if (typeof value === 'number') {
        if (Number.isNaN(value))
            return 0;
        if (isFinite(value))
            return Object.is(value, -0) ? 0 : value;
        return value > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE;
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed.length === 0)
            return 0;
        const parsed = Number(trimmed);
        if (Number.isFinite(parsed))
            return parsed;
    }
    if (typeof value === 'boolean')
        return value ? 1 : 0;
    if (value === null || value === undefined)
        return 0;
    if (typeof value === 'bigint') {
        const n = Number(value);
        if (Number.isFinite(n))
            return n;
        return n > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE;
    }
    if (typeof value === 'object') {
        const primitive = (_c = (_b = (_a = value).valueOf) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : value;
        const num = typeof primitive === 'object' ? Number(String(primitive)) : Number(primitive);
        if (Number.isFinite(num))
            return num;
    }
    return 0;
}
