"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIn = setIn;
/**
 * Immutable set at deep path. Creates missing containers (array/object) based on the next key.
 *
 * @example
 * setIn({ a: [{ b: { c: 3 } }] }, 'a[0].b.c', 4) // { a: [{ b: { c: 4 } }] }
 */
function setIn(object, path, value) {
    const keys = Array.isArray(path)
        ? path.slice()
        : String(path)
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .filter(Boolean);
    if (!object || typeof object !== 'object' || keys.length === 0)
        return object;
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
