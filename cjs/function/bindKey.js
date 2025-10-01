"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindKey = bindKey;
/**
 * Creates a function that invokes the method at `object[key]` with `partials` prepended to the arguments it receives.
 *
 * @param object - The object to invoke the method on
 * @param key - The key of the method
 * @param partials - The arguments to be partially applied
 * @returns Returns the new bound function
 *
 * @example
 * ```typescript
 * const object = {
 *   'user': 'fred',
 *   'greet': function(greeting, punctuation) {
 *     return greeting + ' ' + this.user + punctuation;
 *   }
 * };
 *
 * const bound = bindKey(object, 'greet', 'hi');
 * bound('!');
 * // => 'hi fred!'
 * ```
 */
function bindKey(object, key, ...partials) {
    const method = object[key];
    if (typeof method !== 'function') {
        throw new TypeError('Expected a function');
    }
    return (...args) => {
        return method.apply(object, partials.concat(args));
    };
}
