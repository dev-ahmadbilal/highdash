"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSymbol = isSymbol;
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a symbol, else `false`
 *
 * @example
 * ```typescript
 * isSymbol(Symbol.iterator);
 * // => true
 *
 * isSymbol('abc');
 * // => false
 * ```
 */
function isSymbol(value) {
    return typeof value === 'symbol';
}
