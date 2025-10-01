"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = clone;
/**
 * Creates a shallow clone of `value`.
 *
 * @param value - The value to clone
 * @returns Returns the cloned value
 *
 * @example
 * ```typescript
 * const objects = [{ 'a': 1 }, { 'b': 2 }];
 * const shallow = clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 * ```
 */
function clone(value) {
    const seen = new Map();
    function baseClone(input) {
        if (input === null || typeof input !== 'object') {
            return input;
        }
        if (seen.has(input)) {
            return seen.get(input);
        }
        // Date
        if (input instanceof Date) {
            return new Date(input.getTime());
        }
        // RegExp
        if (input instanceof RegExp) {
            return new RegExp(input.source, input.flags);
        }
        // ArrayBuffer
        if (input instanceof ArrayBuffer) {
            const cloned = input.slice(0);
            return cloned;
        }
        // Typed Arrays
        if (ArrayBuffer.isView(input)) {
            // DataView
            if (input instanceof DataView) {
                const buffer = baseClone(input.buffer);
                const cloned = new DataView(buffer, input.byteOffset, input.byteLength);
                return cloned;
            }
            // e.g., Uint8Array, Int16Array, Float32Array, etc.
            const ctor = input.constructor;
            const clonedBuffer = baseClone(input.buffer);
            const cloned = new ctor(clonedBuffer, input.byteOffset, input.length);
            return cloned;
        }
        // Array
        if (Array.isArray(input)) {
            const arr = new Array(input.length);
            seen.set(input, arr);
            for (let i = 0; i < input.length; i++) {
                arr[i] = baseClone(input[i]);
            }
            return arr;
        }
        // Map
        if (input instanceof Map) {
            const result = new Map();
            seen.set(input, result);
            for (const [k, v] of input) {
                result.set(baseClone(k), baseClone(v));
            }
            return result;
        }
        // Set
        if (input instanceof Set) {
            const result = new Set();
            seen.set(input, result);
            for (const v of input) {
                result.add(baseClone(v));
            }
            return result;
        }
        // WeakMap
        if (typeof WeakMap !== 'undefined' && input instanceof WeakMap) {
            const result = new WeakMap();
            seen.set(input, result);
            // Cannot iterate entries of WeakMap; best effort is to return new WeakMap()
            return result;
        }
        // WeakSet
        if (typeof WeakSet !== 'undefined' && input instanceof WeakSet) {
            const result = new WeakSet();
            seen.set(input, result);
            // Cannot iterate entries of WeakSet; best effort is to return new WeakSet()
            return result;
        }
        // Plain objects and class instances
        const proto = Object.getPrototypeOf(input);
        const output = Object.create(proto);
        seen.set(input, output);
        for (const key of Object.keys(input)) {
            output[key] = baseClone(input[key]);
        }
        return output;
    }
    return baseClone(value);
}
