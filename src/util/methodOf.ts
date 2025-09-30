/**
 * The opposite of `method`; this method creates a function that invokes the method at a given path of `object`.
 *
 * @param object - The object to query
 * @param args - The arguments to invoke the method with
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const array = ['a', 'b', 'c'];
 * const func = methodOf(array);
 *
 * func(0);
 * // => 'a'
 *
 * func(1);
 * // => 'b'
 * ```
 */
export function methodOf<T extends unknown[]>(object: unknown, ...args: T): (path: string | string[]) => unknown {
  return (path: string | string[]): unknown => {
    if (!object || typeof object !== 'object') {
      return undefined;
    }

    const pathParts = Array.isArray(path)
      ? path
      : String(path)
          .replace(/\[(\d+)\]/g, '.$1')
          .split('.')
          .filter(Boolean);

    let current: unknown = object;

    for (const part of pathParts) {
      if (current === null || typeof current !== 'object' || !(part in current)) {
        return undefined;
      }
      current = (current as Record<string, unknown>)[part];
    }

    if (typeof current === 'function') {
      return (current as Function).apply(object, args);
    }

    return current;
  };
}
