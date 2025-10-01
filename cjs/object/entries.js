"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entries = entries;
/**
 * Creates an array of own enumerable string keyed-value pairs for `object` which corresponds to the structure of a `for...in` loop.
 *
 * @param object - The object to query
 * @returns Returns the array of key-value pairs
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 * Foo.prototype.c = 3;
 * entries(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 * ```
 */
function entries(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    return Object.entries(object);
}
