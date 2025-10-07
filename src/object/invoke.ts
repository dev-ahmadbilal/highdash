/**
 * Invokes the method at `path` of `object`.
 *
 * @param object - The object to query
 * @param path - The path of the method to invoke
 * @param args - The arguments to invoke the method with
 * @returns Returns the result of the invoked method
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
 * invoke(object, 'a[0].b.c.slice', 1, 3);
 * // => [2, 3]
 * ```
 */
export function invoke(object: unknown, path: string | string[], ...args: unknown[]): unknown {
  if (!object || typeof object !== 'object') {
    return undefined
  }

  const pathParts = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)

  let current: unknown = object

  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i]
    if (current === null || typeof current !== 'object' || !(part in current)) {
      return undefined
    }
    current = (current as Record<string, unknown>)[part]
  }

  const methodName = pathParts[pathParts.length - 1]
  if (current === null || typeof current !== 'object' || !(methodName in current)) {
    return undefined
  }

  const method = (current as Record<string, unknown>)[methodName]
  if (typeof method !== 'function') {
    return undefined
  }

  return (method as Function).apply(current, args)
}
