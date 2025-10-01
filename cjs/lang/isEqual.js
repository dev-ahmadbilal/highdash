"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqual = isEqual;
/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * - Cycle-safe, compares enumerable symbol keys
 * - Supports ArrayBuffer/DataView/TypedArrays, Map, Set, Date, RegExp
 * - Uses SameValueZero for primitives
 *
 * @param value - The value to compare
 * @param other - The other value to compare
 * @returns Returns `true` if the values are equivalent, else `false`
 *
 * @example
 * isEqual({ a: 1 }, { a: 1 }); // true
 * isEqual([1, 2], [1, 2]); // true
 * isEqual(new Set([1,2]), new Set([2,1])); // true
 */
function isEqual(value, other) {
    const stackA = [];
    const stackB = [];
    function sameValueZero(a, b) {
        return a === b || (a !== a && b !== b);
    }
    function isTypedArray(obj) {
        return ArrayBuffer.isView(obj) && !(obj instanceof DataView);
    }
    function equalArrays(a, b) {
        const len = a.length;
        if (len !== b.length)
            return false;
        for (let i = 0; i < len; i++) {
            if (!baseIsEqual(a[i], b[i]))
                return false;
        }
        return true;
    }
    function equalArrayBuffer(a, b) {
        if (a.byteLength !== b.byteLength)
            return false;
        const va = new Uint8Array(a);
        const vb = new Uint8Array(b);
        for (let i = 0; i < va.length; i++) {
            if (va[i] !== vb[i])
                return false;
        }
        return true;
    }
    function equalDataView(a, b) {
        if (a.byteLength !== b.byteLength)
            return false;
        return equalArrayBuffer(a.buffer, b.buffer);
    }
    function equalTypedArrays(a, b) {
        if (a.constructor !== b.constructor)
            return false;
        if (a.length !== b.length)
            return false;
        const len = a.length;
        for (let i = 0; i < len; i++) {
            if (!sameValueZero(a[i], b[i]))
                return false;
        }
        return true;
    }
    function equalSets(a, b) {
        if (a.size !== b.size)
            return false;
        // Unordered deep equality: every aVal must have a match in b
        const used = new Array(b.size).fill(false);
        const bValues = Array.from(b.values());
        outer: for (const aVal of a.values()) {
            for (let i = 0; i < bValues.length; i++) {
                if (used[i])
                    continue;
                if (baseIsEqual(aVal, bValues[i])) {
                    used[i] = true;
                    continue outer;
                }
            }
            return false;
        }
        return true;
    }
    function equalMaps(a, b) {
        if (a.size !== b.size)
            return false;
        const used = new Array(b.size).fill(false);
        const bEntries = Array.from(b.entries());
        outer: for (const [ak, av] of a.entries()) {
            for (let i = 0; i < bEntries.length; i++) {
                if (used[i])
                    continue;
                const [bk, bv] = bEntries[i];
                if (baseIsEqual(ak, bk) && baseIsEqual(av, bv)) {
                    used[i] = true;
                    continue outer;
                }
            }
            return false;
        }
        return true;
    }
    function hasOwn(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
    function equalObjects(a, b) {
        // Compare string keys
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length)
            return false;
        for (const key of aKeys) {
            if (!hasOwn(b, key) || !baseIsEqual(a[key], b[key]))
                return false;
        }
        // Compare enumerable symbol keys
        const aSyms = Object.getOwnPropertySymbols(a).filter((s) => {
            const d = Object.getOwnPropertyDescriptor(a, s);
            return !!d && d.enumerable === true;
        });
        const bSyms = Object.getOwnPropertySymbols(b).filter((s) => {
            const d = Object.getOwnPropertyDescriptor(b, s);
            return !!d && d.enumerable === true;
        });
        if (aSyms.length !== bSyms.length)
            return false;
        for (const s of aSyms) {
            if (!hasOwn(b, s) || !baseIsEqual(a[s], b[s]))
                return false;
        }
        return true;
    }
    function baseIsEqual(a, b) {
        if (a === b)
            return true;
        if (a === null || b === null || a === undefined || b === undefined)
            return a === b;
        const typeA = typeof a;
        const typeB = typeof b;
        if (typeA !== typeB)
            return false;
        if (typeA !== 'object')
            return sameValueZero(a, b);
        // Cycle detection
        const idx = stackA.indexOf(a);
        if (idx !== -1) {
            return stackB[idx] === b;
        }
        stackA.push(a);
        stackB.push(b);
        try {
            // Arrays
            if (Array.isArray(a) || Array.isArray(b)) {
                if (!Array.isArray(a) || !Array.isArray(b))
                    return false;
                return equalArrays(a, b);
            }
            // Dates
            if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            }
            // RegExp
            if (a instanceof RegExp && b instanceof RegExp) {
                return a.toString() === b.toString();
            }
            // ArrayBuffer
            if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
                return equalArrayBuffer(a, b);
            }
            // DataView
            if (a instanceof DataView && b instanceof DataView) {
                return equalDataView(a, b);
            }
            // TypedArrays
            if (isTypedArray(a) && isTypedArray(b)) {
                return equalTypedArrays(a, b);
            }
            // Map
            if (a instanceof Map && b instanceof Map) {
                return equalMaps(a, b);
            }
            // Set
            if (a instanceof Set && b instanceof Set) {
                return equalSets(a, b);
            }
            // Functions are only equal by reference
            if (typeof a === 'function' || typeof b === 'function') {
                return false;
            }
            // Plain/other objects (compare own enumerable string and symbol keys)
            return equalObjects(a, b);
        }
        finally {
            stackA.pop();
            stackB.pop();
        }
    }
    return baseIsEqual(value, other);
}
