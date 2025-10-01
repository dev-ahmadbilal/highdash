"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyOf = propertyOf;
/**
 * The opposite of `property`; this method creates a function that returns the value at a given path of `object`.
 *
 * @param object - The object to query
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const array = ['a', 'b', 'c'];
 * const object = { 'a': array, 'b': array, 'c': array };
 * const func = propertyOf(object);
 *
 * func('a[2]');
 * // => 'c'
 *
 * func(['a', '2']);
 * // => 'c'
 * ```
 */
function propertyOf(object, path) {
    const resolve = (obj, p) => {
        // eslint-disable-next-line eqeqeq
        if (obj == null || p === undefined)
            return undefined;
        const parts = Array.isArray(p)
            ? p
            : String(p)
                .replace(/\[(\d+)\]/g, '.$1')
                .split('.')
                .filter((x) => x.length > 0);
        if (parts.length === 0)
            return undefined;
        let cur = obj;
        for (const part of parts) {
            // eslint-disable-next-line eqeqeq
            if (cur == null)
                return undefined;
            cur = cur[part];
        }
        return cur;
    };
    if (path !== undefined) {
        return () => resolve(object, path);
    }
    return (...args) => resolve(object, args[0]);
}
