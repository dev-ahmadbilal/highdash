/**
 * The opposite of `pick`; this method creates an object composed of the own enumerable string keyed properties of `object` that are not omitted.
 *
 * @param object - The source object
 * @param paths - The property paths to omit
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(object: T, paths: K[]): Omit<T, K> {
  const result = {} as Omit<T, K>

  if (!object || typeof object !== 'object') {
    return result
  }

  // Optimize for small arrays - use indexOf instead of Set
  const useSet = paths.length > 10
  const pathsSet = useSet ? new Set(paths) : null

  for (const key in object) {
    if (Object.hasOwn(object, key)) {
      const shouldOmit = useSet ? pathsSet!.has(key as unknown as K) : paths.indexOf(key as unknown as K) !== -1

      if (!shouldOmit) {
        ;(result as Record<string, unknown>)[key] = object[key as keyof T]
      }
    }
  }

  return result
}
