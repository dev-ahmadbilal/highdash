"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partial = partial;
/**
 * Creates a function that invokes `func` with `partials` prepended to the arguments it receives.
 *
 * @param func - The function to partially apply arguments to
 * @param partials - The arguments to be partially applied
 * @returns Returns the new partially applied function
 *
 * @example
 * ```typescript
 * const greet = (greeting: string, name: string) => `${greeting} ${name}`;
 * const sayHelloTo = partial(greet, 'hello');
 * sayHelloTo('fred');
 * // => 'hello fred'
 * ```
 */
function partial(func, ...partials) {
    return (...args) => {
        return func(...partials, ...args);
    };
}
