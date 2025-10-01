"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = remove;
/**
 * Removes all elements from `array` that `predicate` returns truthy for and returns an array of the removed elements.
 * The predicate is invoked with three arguments: (value, index, array).
 *
 * @param array - The array to modify
 * @param predicate - The function invoked per iteration
 * @returns Returns the new array of removed elements
 *
 * @example
 * ```typescript
 * const array = [1, 2, 3, 4];
 * const evens = remove(array, n => n % 2 == 0);
 * console.log(array);
 * // => [1, 3]
 * console.log(evens);
 * // => [2, 4]
 * ```
 */
function remove(array, predicate) {
    if (!Array.isArray(array)) {
        return [];
    }
    const removed = [];
    let writeIndex = 0;
    for (let readIndex = 0; readIndex < array.length; readIndex++) {
        if (predicate(array[readIndex], readIndex, array)) {
            removed.push(array[readIndex]);
        }
        else {
            array[writeIndex] = array[readIndex];
            writeIndex++;
        }
    }
    array.length = writeIndex;
    return removed;
}
