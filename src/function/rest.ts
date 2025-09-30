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
export function rest<T extends (...args: unknown[]) => unknown>(func: T, start: number = func.length - 1): T {
  if (start < 0) {
    start = 0;
  }

  return ((...args: Parameters<T>) => {
    const restArgs = args.slice(start);
    const fixedArgs = args.slice(0, start);
    return func(...fixedArgs, restArgs);
  }) as T;
}
