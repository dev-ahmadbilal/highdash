"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = result;
/**
 * This method is like `get` except that if the resolved value is a function it's invoked with the `this` binding of its parent object and its result is returned.
 *
 * @param object - The object to query
 * @param path - The path of the property to resolve
 * @param defaultValue - The value returned for `undefined` resolved values
 * @returns Returns the resolved value
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c1': 3, 'c2': () => 4 } }] };
 * result(object, 'a[0].b.c1');
 * // => 3
 *
 * result(object, 'a[0].b.c2');
 * // => 4
 *
 * result(object, 'a[0].b.c3', 'default');
 * // => 'default'
 * ```
 */
function result(object, path, defaultValue) {
    var _a;
    if (!object || typeof object !== 'object') {
        return defaultValue;
    }
    const pathParts = Array.isArray(path)
        ? path
        : String(path)
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .filter(Boolean);
    let current = object;
    for (const part of pathParts) {
        if (current === null || typeof current !== 'object' || !(part in current)) {
            // Missing path → if defaultValue is a function, invoke it
            return (typeof defaultValue === 'function' ? defaultValue.call(object) : defaultValue);
        }
        current = current[part];
    }
    if (typeof current === 'function') {
        return current.call(object);
    }
    if (current === undefined && typeof defaultValue === 'function') {
        return defaultValue.call(object);
    }
    return (_a = current) !== null && _a !== void 0 ? _a : defaultValue;
}
