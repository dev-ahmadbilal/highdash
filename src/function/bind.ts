/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @param func - The function to bind
 * @param thisArg - The `this` binding of `func`
 * @param partials - The arguments to be partially applied
 * @returns Returns the new bound function
 *
 * @example
 * ```typescript
 * const greet = function(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * };
 *
 * const object = { 'user': 'fred' };
 * const bound = bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 * ```
 */
export function bind<T extends (...args: unknown[]) => unknown>(
  func: T,
  thisArg: unknown,
  ...partials: unknown[]
): (...args: unknown[]) => ReturnType<T> {
  return (...args: unknown[]): ReturnType<T> => {
    return func.apply(thisArg, partials.concat(args)) as ReturnType<T>;
  };
}
