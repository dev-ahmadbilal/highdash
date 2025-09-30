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
export function methodOf(object: unknown, path?: string | string[]): (...args: unknown[]) => unknown {
  const resolve = (obj: any, p: string | string[] | undefined): any => {
    // eslint-disable-next-line eqeqeq
    if (obj == null || p === undefined) return undefined;
    const parts = Array.isArray(p)
      ? p
      : String(p)
          .replace(/\[(\d+)\]/g, '.$1')
          .split('.')
          .filter((x) => x.length > 0);
    if (parts.length === 0) return undefined;
    let cur: any = obj;
    for (const part of parts) {
      // eslint-disable-next-line eqeqeq
      if (cur == null) return undefined;
      cur = cur[part];
    }
    return cur;
  };

  if (path !== undefined) {
    return () => resolve(object as any, path);
  }

  return (...args: unknown[]) => {
    const dynamicPath = args[0] as string | string[];
    return resolve(object as any, dynamicPath);
  };
}
