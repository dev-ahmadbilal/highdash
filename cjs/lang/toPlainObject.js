"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlainObject = toPlainObject;
/**
 * Converts `value` to a plain object flattening inherited enumerable string keyed properties of `value` to own properties of the plain object.
 *
 * @param value - The value to convert
 * @returns Returns the converted plain object
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * toPlainObject(new Foo);
 * // => { 'b': 2, 'c': 3 }
 * ```
 */
function toPlainObject(value) {
    if (value === null || value === undefined)
        return {};
    if (typeof value === 'string') {
        const obj = {};
        const str = String(value);
        for (let i = 0; i < str.length; i++) {
            obj[String(i)] = str[i];
        }
        return obj;
    }
    const result = {};
    // Copy own enumerable properties (including symbol)
    if (typeof value === 'object') {
        for (const key of Reflect.ownKeys(value)) {
            const desc = Object.getOwnPropertyDescriptor(value, key);
            if (desc && desc.enumerable) {
                result[key] = value[key];
            }
        }
        // Copy inherited enumerable string-keyed properties
        let proto = Object.getPrototypeOf(value);
        while (proto && proto !== Object.prototype) {
            for (const key in proto) {
                if (Object.hasOwn(proto, key)) {
                    result[key] = proto[key];
                }
            }
            proto = Object.getPrototypeOf(proto);
        }
    }
    return result;
}
