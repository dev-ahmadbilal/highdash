"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = isPlainObject;
const isObject_js_1 = require("./isObject.js");
/**
 * Checks if `value` is a plain object, that is, an object created by the `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a plain object, else `false`
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * isPlainObject(new Foo);
 * // => false
 *
 * isPlainObject([1, 2, 3]);
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * isPlainObject(Object.create(null));
 * // => true
 * ```
 */
function isPlainObject(value) {
    if (!(0, isObject_js_1.isObject)(value)) {
        return false;
    }
    // Check if it's an array
    if (Array.isArray(value)) {
        return false;
    }
    // Check if it's a function
    if (typeof value === 'function') {
        return false;
    }
    // Check if it's a Date
    if (value instanceof Date) {
        return false;
    }
    // Check if it's a RegExp
    if (value instanceof RegExp) {
        return false;
    }
    // Check if it's a Map or Set
    if (value instanceof Map || value instanceof Set) {
        return false;
    }
    // Check if it's a typed array
    if (ArrayBuffer.isView(value)) {
        return false;
    }
    // Check if it's a plain object by checking its prototype
    const proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
}
