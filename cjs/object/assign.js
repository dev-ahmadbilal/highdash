"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = assign;
/**
 * Assigns own enumerable string keyed properties of source objects to the destination object.
 * Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
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
 * function Bar() {
 *   this.c = 3;
 * }
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 * assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 * ```
 */
function assign(object, ...sources) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    for (const source of sources) {
        if (!source || typeof source !== 'object') {
            continue;
        }
        for (const key in source) {
            if (Object.hasOwn(source, key)) {
                object[key] = source[key];
            }
        }
    }
    return object;
}
