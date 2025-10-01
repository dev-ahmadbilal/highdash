"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualWith = isEqualWith;
/**
 * This method is like `isEqual` except that it accepts `customizer` which is invoked to compare values.
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @param customizer - The function to customize comparisons
 * @returns Returns `true` if the values are equivalent, else `false`
 *
 * @example
 * ```typescript
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true;
 *   }
 * }
 *
 * const array = ['hello', 'goodbye'];
 * const other = ['hi', 'goodbye'];
 *
 * isEqualWith(array, other, customizer);
 * // => true
 * ```
 */
function baseIsEqualWith(value, other, customizer, key, parentA, parentB) {
    var _a;
    if (customizer) {
        const custom = customizer(value, other, (_a = key) !== null && _a !== void 0 ? _a : '', parentA !== null && parentA !== void 0 ? parentA : value, parentB !== null && parentB !== void 0 ? parentB : other, undefined);
        if (custom !== undefined)
            return custom;
    }
    if (value === other)
        return true;
    if (value === null || other === null || typeof value !== 'object' || typeof other !== 'object') {
        return false;
    }
    if (Array.isArray(value) !== Array.isArray(other)) {
        return false;
    }
    if (Array.isArray(value) && Array.isArray(other)) {
        if (value.length !== other.length) {
            return false;
        }
        for (let i = 0; i < value.length; i++) {
            if (!baseIsEqualWith(value[i], other[i], customizer, i, value, other)) {
                return false;
            }
        }
        return true;
    }
    const valueObj = value;
    const otherObj = other;
    const valueKeys = Object.keys(valueObj);
    const otherKeys = Object.keys(otherObj);
    if (valueKeys.length !== otherKeys.length) {
        return false;
    }
    for (const k of valueKeys) {
        if (!otherKeys.includes(k)) {
            return false;
        }
        if (!baseIsEqualWith(valueObj[k], otherObj[k], customizer, k, valueObj, otherObj)) {
            return false;
        }
    }
    return true;
}
function isEqualWith(value, other, customizer) {
    return baseIsEqualWith(value, other, customizer);
}
