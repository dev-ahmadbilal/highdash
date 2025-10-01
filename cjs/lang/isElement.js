"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElement = isElement;
/**
 * Checks if `value` is likely a DOM element.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a DOM element, else `false`
 *
 * @example
 * ```typescript
 * isElement(document.body);
 * // => true
 *
 * isElement('<body>');
 * // => false
 * ```
 */
function isElement(value) {
    return (value !== null &&
        typeof value === 'object' &&
        typeof value.nodeType === 'number' &&
        value.nodeType === 1);
}
