"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeepWith = cloneDeepWith;
/**
 * This method is like `cloneDeep` except that it accepts `customizer`
 * which is invoked to produce the cloned value. If `customizer` returns
 * `undefined`, cloning is handled by the method instead. The `customizer`
 * is invoked with up to four arguments: (value, key, object, stack).
 *
 * The implementation mirrors `cloneDeep` behavior for built-in types and
 * supports circular references via a stack map.
 */
function cloneDeepWith(value, customizer) {
    const stack = new Map();
    function baseCloneDeepWith(input, key, parent) {
        if (customizer) {
            const customized = customizer(input, key, parent, stack);
            if (customized !== undefined) {
                return customized;
            }
        }
        if (input === null || typeof input !== 'object') {
            return input;
        }
        if (stack.has(input)) {
            return stack.get(input);
        }
        if (input instanceof Date) {
            return new Date(input.getTime());
        }
        if (input instanceof RegExp) {
            return new RegExp(input.source, input.flags);
        }
        if (input instanceof Map) {
            const clonedMap = new Map();
            stack.set(input, clonedMap);
            for (const [k, v] of input) {
                clonedMap.set(baseCloneDeepWith(k, undefined, input), baseCloneDeepWith(v, undefined, input));
            }
            return clonedMap;
        }
        if (input instanceof Set) {
            const clonedSet = new Set();
            stack.set(input, clonedSet);
            for (const v of input) {
                clonedSet.add(baseCloneDeepWith(v, undefined, input));
            }
            return clonedSet;
        }
        if (Array.isArray(input)) {
            const arr = new Array(input.length);
            stack.set(input, arr);
            for (let i = 0; i < input.length; i++) {
                arr[i] = baseCloneDeepWith(input[i], i, input);
            }
            return arr;
        }
        if (input instanceof ArrayBuffer) {
            return input.slice(0);
        }
        if (input instanceof DataView) {
            const buffer = input.buffer.slice(0);
            return new DataView(buffer, input.byteOffset, input.byteLength);
        }
        if (ArrayBuffer.isView(input)) {
            if (input instanceof DataView) {
                const buffer = input.buffer.slice(0);
                return new DataView(buffer, input.byteOffset, input.byteLength);
            }
            return input.slice(0);
        }
        // Plain object
        const cloned = {};
        stack.set(input, cloned);
        for (const k in input) {
            if (Object.hasOwn(input, k)) {
                cloned[k] = baseCloneDeepWith(input[k], k, input);
            }
        }
        // Also copy symbol keys
        const symbols = Object.getOwnPropertySymbols(input);
        for (const sym of symbols) {
            const desc = Object.getOwnPropertyDescriptor(input, sym);
            if (desc && desc.enumerable) {
                cloned[sym] = baseCloneDeepWith(input[sym], sym, input);
            }
        }
        return cloned;
    }
    return baseCloneDeepWith(value, undefined, undefined);
}
