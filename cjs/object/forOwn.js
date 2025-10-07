"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forOwn = forOwn;
/**
 * Iterates over own enumerable string keyed properties of `object` invoking `iteratee` for each property.
 *
 * @param object - The object to iterate over
 * @param iteratee - The function invoked per iteration
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a', 'b' (iteration order is not guaranteed)
 * ```
 */
function forOwn(object, iteratee) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    for (const key in object) {
        if (Object.hasOwn(object, key)) {
            const value = object[key];
            const result = iteratee(value, key, object);
            if (result === false) {
                break;
            }
        }
    }
    return object;
}
