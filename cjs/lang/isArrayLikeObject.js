"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayLikeObject = isArrayLikeObject;
const isArrayLike_js_1 = require("./isArrayLike.js");
/**
 * This method is like `isArrayLike` except that it also checks if `value` is an object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an array-like object, else `false`
 *
 * @example
 * ```typescript
 * isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * isArrayLikeObject(document.body.children);
 * // => true
 *
 * isArrayLikeObject('abc');
 * // => false
 * ```
 */
function isArrayLikeObject(value) {
    return (0, isArrayLike_js_1.isArrayLike)(value) && typeof value === 'object';
}
