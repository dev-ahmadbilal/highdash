"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNative = isNative;
/**
 * Checks if `value` is a native function.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a native function, else `false`
 *
 * @example
 * ```typescript
 * isNative(Array.prototype.push);
 * // => true
 *
 * isNative(isNaN);
 * // => true
 *
 * isNative(() => {});
 * // => false
 * ```
 */
function isNative(value) {
    if (typeof value !== 'function') {
        return false;
    }
    const func = value;
    const funcString = Function.prototype.toString.call(func);
    // Bound functions include 'native code' sometimes; detect bound by presence of 'bound '
    if (/^bound\s/.test(func.name) ||
        funcString.startsWith('function bound ') ||
        (funcString.includes('native code') && funcString.includes('bound '))) {
        return false;
    }
    // Check for native function patterns
    return (funcString.includes('[native code]') ||
        funcString.includes('[object Function]') ||
        /^function\s+\w*\s*\(\s*\)\s*\{\s*\[native code\]\s*\}$/.test(funcString));
}
