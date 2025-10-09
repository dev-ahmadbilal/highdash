"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIn = setIn;
/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist, it's created.
 * Arrays are created for missing index properties, objects are created for all other missing properties.
 *
 * @param object - The object to modify
 * @param path - The path of the property to set
 * @param value - The value to set
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * setIn(object, 'a[0].b.c', 4);
 * // => { 'a': [{ 'b': { 'c': 4 } }] }
 *
 * setIn(object, ['x', '0', 'y', 'z'], 5);
 * // => { 'a': [{ 'b': { 'c': 4 } }], 'x': [{ 'y': { 'z': 5 } }] }
 * ```
 */
function setIn(object, path, value) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    let keys;
    if (Array.isArray(path)) {
        keys = path;
    }
    else {
        if (path === '') {
            return value;
        }
        // eslint-disable-next-line no-useless-escape
        keys = path.split(/[.[\]]+/).filter(Boolean);
    }
    if (keys.length === 0) {
        return value;
    }
    function cloneShallow(obj) {
        return Array.isArray(obj) ? obj.slice() : Object.assign({}, obj);
    }
    const result = cloneShallow(object);
    let cur = result;
    let src = object;
    for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        const nk = keys[i + 1];
        const nextIsIndex = /^\d+$/.test(nk);
        // eslint-disable-next-line eqeqeq
        const srcNext = src != null ? src[k] : undefined;
        // eslint-disable-next-line eqeqeq
        const next = srcNext != null ? srcNext : nextIsIndex ? [] : {};
        const cloned = cloneShallow(next);
        cur[k] = cloned;
        cur = cloned;
        src = srcNext;
    }
    const last = keys[keys.length - 1];
    cur[last] = value;
    return result;
}
