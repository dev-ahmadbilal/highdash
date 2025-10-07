/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @param object - The object to query
 * @param path - The path to check
 * @returns Returns `true` if `path` exists, else `false`
 *
 * @example
 * ```typescript
 * const object = create({ 'a': create({ 'b': 2 }) });
 * hasIn(object, 'a');
 * // => true
 *
 * hasIn(object, 'a.b');
 * // => true
 *
 * hasIn(object, 'b');
 * // => false
 * ```
 */
export function hasIn(object: object | null | undefined, path: string | string[]): boolean {
  if (!object || typeof object !== 'object') {
    return false
  }

  const pathParts = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)

  let current: unknown = object

  for (const part of pathParts) {
    if (current === null || typeof current !== 'object' || !(part in current)) {
      return false
    }
    current = (current as Record<string, unknown>)[part]
  }

  return true
}
