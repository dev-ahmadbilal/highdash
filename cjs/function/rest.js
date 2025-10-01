"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = rest;
/**
 * Creates a function that invokes `func` with the `this` binding of the created function and arguments from `start` and beyond provided as an array.
 *
 * @param func - The function to apply a rest parameter to
 * @param start - The start position of rest parameters
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const say = rest((what, names) => what + ' ' + names.join(', '));
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, pebbles'
 * ```
 */
function rest(func, start = func.length - 1) {
    if (start < 0) {
        start = Math.max(0, func.length + start);
    }
    return ((...args) => {
        const actualStart = Math.min(start, args.length);
        const fixedArgs = args.slice(0, actualStart);
        const includeTail = func.length > start + 1;
        if (includeTail) {
            const head = args.slice(actualStart);
            const tail = args[args.length - 1];
            return func(...[...fixedArgs, head, tail]);
        }
        const restArgs = args.slice(actualStart);
        return func(...[...fixedArgs, restArgs]);
    });
}
