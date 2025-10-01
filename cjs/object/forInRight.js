"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forInRight = forInRight;
/**
 * This method is like `forIn` except that it iterates over properties in reverse order.
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
 * forInRight(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'c', 'b', then 'a' (iteration order is not guaranteed)
 * ```
 */
function forInRight(object, iteratee) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    const keys = [];
    for (const key in object) {
        keys.push(key);
    }
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        const value = object[key];
        const result = iteratee(value, key, object);
        if (result === false) {
            break;
        }
    }
    return object;
}
