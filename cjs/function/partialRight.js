"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialRight = partialRight;
/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * @param func - The function to partially apply arguments to
 * @param partials - The arguments to be partially applied
 * @returns Returns the new partially applied function
 *
 * @example
 * ```typescript
 * const greet = (greeting: string, name: string) => `${greeting} ${name}`;
 * const greetFred = partialRight(greet, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 * ```
 */
function partialRight(func, ...partials) {
    return (...args) => {
        return func(...args, ...partials);
    };
}
