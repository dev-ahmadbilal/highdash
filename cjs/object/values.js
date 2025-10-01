"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.values = values;
/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * @param object - The object to query
 * @returns Returns the array of property values
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 * Foo.prototype.c = 3;
 * values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 * ```
 */
function values(object) {
    if (!object || typeof object !== 'object') {
        return [];
    }
    return Object.values(object);
}
