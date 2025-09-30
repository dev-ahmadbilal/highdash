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
    start = Math.max(0, func.length + start);
  }

  return ((...args: Parameters<T>) => {
    const actualStart = Math.min(start, args.length);
    const fixedArgs = (args as unknown[]).slice(0, actualStart);
    const includeTail = func.length > start + 1;
    if (includeTail) {
      const head = (args as unknown[]).slice(actualStart);
      const tail = (args as unknown[])[(args as unknown[]).length - 1];
      return func(...([...(fixedArgs as unknown[]), head, tail] as any));
    }
    const restArgs = (args as unknown[]).slice(actualStart);
    return func(...([...(fixedArgs as unknown[]), restArgs] as any));
  }) as T;
}
