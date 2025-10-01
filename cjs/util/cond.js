"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cond = cond;
/**
 * Creates a function that iterates over `pairs` and invokes the corresponding function of the first predicate to return truthy.
 *
 * @param pairs - The predicate-function pairs
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const func = cond([
 *   [matches({ 'a': 1 }), () => 'matches A'],
 *   [conforms({ 'b': isNumber }), () => 'matches B'],
 *   [() => true, () => 'no match']
 * ]);
 *
 * func({ 'a': 1, 'b': 2 });
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 });
 * // => 'matches B'
 *
 * func({ 'a': '1' });
 * // => 'no match'
 * ```
 */
function cond(pairs) {
    return (...args) => {
        for (const [predicate, func] of pairs) {
            const predVal = typeof predicate === 'function' ? predicate(...args) : predicate;
            if (predVal) {
                return func(...args);
            }
        }
        return undefined;
    };
}
