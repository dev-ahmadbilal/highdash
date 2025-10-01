"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetIn = unsetIn;
/**
 * Immutable unset at deep path. Removes key/index and returns a new object.
 *
 * @example
 * unsetIn({ a: [ { b: 1 }, { c: 2 } ] }, 'a[1].c') // { a: [ { b: 1 }, {} ] }
 */
function unsetIn(object, path) {
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
    const parents = [];
    const parentKeys = [];
    for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        // eslint-disable-next-line eqeqeq
        const srcNext = src != null ? src[k] : undefined;
        const cloned = cloneShallow(srcNext !== null && srcNext !== void 0 ? srcNext : {});
        cur[k] = cloned;
        parents.push(cur);
        parentKeys.push(k);
        cur = cloned;
        src = srcNext;
    }
    const last = keys[keys.length - 1];
    if (Array.isArray(cur)) {
        cur.splice(Number(last), 1);
    }
    else {
        delete cur[last];
    }
    return result;
}
