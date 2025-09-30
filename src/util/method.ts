/**
 * Creates a function that invokes the method at `path` of a given object.
 *
 * @param path - The path of the method to invoke
 * @param args - The arguments to invoke the method with
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const objects = [
 *   { 'a': { 'b': () => 2 } },
 *   { 'a': { 'b': () => 1 } }
 * ];
 *
 * map(objects, method('a.b'));
 * // => [2, 1]
 *
 * map(objects, method(['a', 'b']));
 * // => [2, 1]
 * ```
 */
export function method<T extends unknown[]>(path: string | string[], ...args: T): (object: unknown) => unknown {
  return (object: unknown): unknown => {
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

    return undefined;
  };
}
