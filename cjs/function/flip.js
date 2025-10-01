"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flip = flip;
/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @param func - The function to flip arguments for
 * @returns Returns the new flipped function
 *
 * @example
 * ```typescript
 * const flipped = flip((...args) => args);
 *
 * flipped('a', 'b', 'c', 'd');
 * // => ['d', 'c', 'b', 'a']
 * ```
 */
function flip(func) {
    return ((...args) => {
        if (args.length < 2)
            return func(...args);
        const [first, second, ...rest] = args;
        return func(...[second, first, ...rest]);
    });
}
