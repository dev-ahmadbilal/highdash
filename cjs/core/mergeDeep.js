"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = mergeDeep;
/**
 * Creates a new object by deeply merging own enumerable properties of the source objects into a copy of the destination.
 *
 * - Arrays are merged index-wise (recursively merging objects/arrays at the same index, overwriting otherwise)
 * - Non-plain objects are overwritten by assignment
 * - Enumerable symbol keys are merged
 * - Cycle-safe
 * - Immutable (does not mutate the input `object`)
 *
 * @example
 * const a = { a: [{ b: 2 }, { d: 4 }] };
 * const b = { a: [{ c: 3 }, { e: 5 }] };
 * const r = mergeDeep(a, b);
 * // => { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
 */
function mergeDeep(object, ...sources) {
    if (!isObject(object)) {
        return object;
    }
    const seen = new WeakMap();
    function isPlainObject(val) {
        if (val === null || typeof val !== 'object')
            return false;
        const proto = Object.getPrototypeOf(val);
        return proto === Object.prototype || proto === null;
    }
    function cloneArray(arr) {
        return arr.slice();
    }
    function cloneObject(obj) {
        const out = {};
        for (const k in obj) {
            if (Object.hasOwn(obj, k))
                out[k] = obj[k];
        }
        const syms = Object.getOwnPropertySymbols(obj);
        for (const s of syms) {
            const d = Object.getOwnPropertyDescriptor(obj, s);
            if (d && d.enumerable)
                out[s] = obj[s];
        }
        return out;
    }
    function mergeArrays(targetArr, sourceArr) {
        const result = cloneArray(targetArr);
        const maxLen = Math.max(result.length, sourceArr.length);
        for (let i = 0; i < maxLen; i++) {
            const t = result[i];
            const s = sourceArr[i];
            if (s === undefined)
                continue;
            if (Array.isArray(t) && Array.isArray(s)) {
                result[i] = mergeArrays(t, s);
            }
            else if (isPlainObject(t) && isPlainObject(s)) {
                result[i] = baseMerge(cloneObject(t), s);
            }
            else {
                result[i] = s;
            }
        }
        return result;
    }
    function assignEnumerableSymbols(target, source) {
        const symbols = Object.getOwnPropertySymbols(source);
        for (const sym of symbols) {
            const desc = Object.getOwnPropertyDescriptor(source, sym);
            if (desc && desc.enumerable) {
                const sVal = source[sym];
                const tVal = target[sym];
                if (Array.isArray(tVal) && Array.isArray(sVal)) {
                    ;
                    target[sym] = mergeArrays(tVal, sVal);
                }
                else if (isPlainObject(tVal) && isPlainObject(sVal)) {
                    ;
                    target[sym] = baseMerge(cloneObject(tVal), sVal);
                }
                else {
                    ;
                    target[sym] = sVal;
                }
            }
        }
    }
    function baseMerge(target, source) {
        if (seen.has(source)) {
            return target;
        }
        seen.set(source, target);
        for (const key in source) {
            if (!Object.hasOwn(source, key))
                continue;
            const sVal = source[key];
            const tVal = target[key];
            if (Array.isArray(tVal) && Array.isArray(sVal)) {
                ;
                target[key] = mergeArrays(tVal, sVal);
                continue;
            }
            if (isPlainObject(tVal) && isPlainObject(sVal)) {
                ;
                target[key] = baseMerge(cloneObject(tVal), sVal);
                continue;
            }
            if (isPlainObject(sVal) && !isPlainObject(tVal) && tVal !== undefined) {
                ;
                target[key] = baseMerge({}, sVal);
                continue;
            }
            ;
            target[key] = sVal;
        }
        assignEnumerableSymbols(target, source);
        return target;
    }
    // Start from a shallow clone of the root object
    let result = (Array.isArray(object) ? cloneArray(object) : cloneObject(object));
    for (const src of sources) {
        if (!isObject(src))
            continue;
        result = baseMerge(result, src);
    }
    return result;
}
function isObject(value) {
    return value !== null && typeof value === 'object';
}
