"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
/**
 * An alternative to `reduce`; this method transforms `object` to a new `accumulator` object which is the result of running each of its own enumerable string keyed properties thru `iteratee`, with each invocation potentially mutating the `accumulator` object.
 *
 * @param object - The object to iterate over
 * @param iteratee - The function invoked per iteration
 * @param accumulator - The custom accumulator value
 * @returns Returns the accumulated value
 *
 * @example
 * ```typescript
 * transform([2, 3, 4], (result, n) => {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 * ```
 */
function transform(object, iteratee, accumulator) {
    if (!object) {
        return accumulator;
    }
    let result = accumulator;
    if (result === undefined) {
        result = Array.isArray(object) ? [] : {};
    }
    if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
            const value = object[i];
            const newResult = iteratee(result, value, i, object);
            if (newResult === false) {
                break;
            }
            // iteratee may mutate result; if it returned a truthy object, update reference
            if (newResult !== undefined && newResult !== true) {
                result = newResult;
            }
        }
    }
    else if (typeof object === 'object') {
        for (const key in object) {
            if (Object.hasOwn(object, key)) {
                const value = object[key];
                const newResult = iteratee(result, value, key, object);
                if (newResult === false) {
                    break;
                }
                if (newResult !== undefined && newResult !== true) {
                    result = newResult;
                }
            }
        }
    }
    return result;
}
