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
export function method(path: string | string[]): (object: unknown) => unknown {
  const parts = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter((x) => x.length > 0);

  return (object: unknown): unknown => {
    if (object === null || object === undefined || typeof object !== 'object') {
      return undefined;
    }
    if (parts.length === 0) return undefined;
    let cur: any = object;
    for (const p of parts) {
      if (cur === null) return undefined;
      cur = cur[p];
    }
    return cur;
  };
}
