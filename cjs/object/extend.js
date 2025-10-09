"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = extend;
/**
 * This method is like `assign` except that it iterates over own and inherited source properties.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * extend({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 * ```
 */
function extend(object, ...sources) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    for (const source of sources) {
        if (!source || typeof source !== 'object') {
            continue;
        }
        for (const key in source) {
            ;
            object[key] = source[key];
        }
    }
    return object;
}
