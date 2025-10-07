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
export function partial<T extends (...args: unknown[]) => unknown>(
  func: T,
  ...partials: unknown[]
): (...args: unknown[]) => ReturnType<T> {
  return (...args: unknown[]) => {
    return func(...partials, ...args) as ReturnType<T>
  }
}
