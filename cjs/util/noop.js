"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = noop;
/**
 * This method returns `undefined`.
 *
 * @returns Returns `undefined`
 *
 * @example
 * ```typescript
 * times(2, noop);
 * // => [undefined, undefined]
 * ```
 */
function noop() {
    return undefined;
}
