"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = functions;
/**
 * Creates an array of function property names from own enumerable properties of `object`.
 *
 * @param object - The object to inspect
 * @returns Returns the function names
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = () => 'a';
 *   this.b = () => 'b';
 * }
 *
 * Foo.prototype.c = () => 'c';
 *
 * functions(new Foo);
 * // => ['a', 'b']
 * ```
 */
function functions(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    const result = [];
    for (const key in object) {
        if (Object.hasOwn(object, key)) {
            const value = object[key];
            if (typeof value === 'function') {
                result.push(key);
            }
        }
    }
    return result;
}
