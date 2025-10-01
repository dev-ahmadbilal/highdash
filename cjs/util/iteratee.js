"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iteratee = iteratee;
/**
 * Creates a function that invokes `iteratee` with the arguments it receives and returns its result.
 *
 * @param iteratee - The iteratee to wrap
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const objects = [{ 'a': 1 }, { 'a': 2 }];
 * const func = iteratee('a');
 * map(objects, func);
 * // => [1, 2]
 * ```
 */
function iteratee(iteratee) {
    if (typeof iteratee === 'function') {
        return iteratee;
    }
    if (typeof iteratee === 'string') {
        // Support deep path access like 'a.b[0].c'
        const raw = iteratee;
        const path = raw
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .filter(Boolean);
        return (value) => {
            // If value is not object-like, treat as equality predicate against the raw string
            if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
                return value === raw;
            }
            let current = value;
            for (const key of path) {
                if (current === null)
                    return undefined;
                current = current === null || current === void 0 ? void 0 : current[key];
            }
            return current;
        };
    }
    if (typeof iteratee === 'object' && iteratee !== null) {
        const src = iteratee;
        const isMatchDeep = (obj, srcObj) => {
            if (obj === srcObj)
                return true;
            if (obj === null || srcObj === null)
                return false;
            if (typeof srcObj !== 'object')
                return obj === srcObj;
            for (const key of Object.keys(srcObj)) {
                if (!isMatchDeep(obj === null || obj === void 0 ? void 0 : obj[key], srcObj[key]))
                    return false;
            }
            return true;
        };
        return (value) => isMatchDeep(value, src);
    }
    return (value) => value === iteratee;
}
