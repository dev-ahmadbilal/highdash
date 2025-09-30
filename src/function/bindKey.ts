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
export function bindKey<T extends Record<string, unknown>>(
  object: T,
  key: keyof T,
  ...partials: unknown[]
): (...args: unknown[]) => unknown {
  return (...args: unknown[]): unknown => {
    const method = object[key];
    if (typeof method !== 'function') {
      throw new TypeError('Expected a function');
    }
    return (method as Function).apply(object, partials.concat(args));
  };
}
