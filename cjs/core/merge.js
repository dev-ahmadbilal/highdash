"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = merge;
/**
 * Recursively merges own enumerable string keyed properties of source objects into the destination object.
 * Source properties that resolve to `undefined` are skipped if a destination value exists.
 * Array and plain object properties are merged recursively. Other objects and value types are overridden by assignment.
 * Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 * const other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 * merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 * ```
 */
function merge(object, ...sources) {
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
    function mergeArrays(targetArr, sourceArr) {
        const maxLen = Math.max(targetArr.length, sourceArr.length);
        const result = targetArr;
        for (let i = 0; i < maxLen; i++) {
            const t = result[i];
            const s = sourceArr[i];
            if (s === undefined)
                continue;
            if (isPlainObject(t) && isPlainObject(s)) {
                result[i] = baseMerge(t, s);
            }
            else if (Array.isArray(t) && Array.isArray(s)) {
                result[i] = mergeArrays(t, s);
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
                if (isPlainObject(tVal) && isPlainObject(sVal)) {
                    target[sym] = baseMerge(tVal, sVal);
                }
                else if (Array.isArray(tVal) && Array.isArray(sVal)) {
                    target[sym] = mergeArrays(tVal, sVal);
                }
                else {
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
            if (!Object.prototype.hasOwnProperty.call(source, key))
                continue;
            const sVal = source[key];
            const tVal = target[key];
            if (Array.isArray(tVal) && Array.isArray(sVal)) {
                target[key] = mergeArrays(tVal, sVal);
                continue;
            }
            if (isPlainObject(tVal) && isPlainObject(sVal)) {
                target[key] = baseMerge(tVal, sVal);
                continue;
            }
            if (isPlainObject(sVal) && !isPlainObject(tVal) && tVal !== undefined) {
                // If destination has a non-plain object and source is plain, overwrite (Lodash does overwrite non-mergeables)
                target[key] = baseMerge({}, sVal);
                continue;
            }
            target[key] = sVal;
        }
        // Merge enumerable symbol keys
        assignEnumerableSymbols(target, source);
        return target;
    }
    for (const src of sources) {
        if (!isObject(src))
            continue;
        // Merge string-keyed enumerable own props
        baseMerge(object, src);
    }
    return object;
}
/**
 * Checks if `value` is the language type of `Object` (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`).
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an object, else `false`
 */
function isObject(value) {
    return value !== null && typeof value === 'object';
}
