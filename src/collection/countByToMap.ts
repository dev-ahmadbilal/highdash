import { get } from '../object/get.js'

/**
 * Counts items by key into a Map of key -> count.
 *
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 *
 * @example
 * ```typescript
 * countByToMap(['a','bb','c'], 'length')
 * // => Map { 1 => 2, 2 => 1 }
 *
 * countByToMap([
 *   { user: { name: 'fred', age: 40 } },
 *   { user: { name: 'barney', age: 36 } },
 *   { user: { name: 'fred', age: 40 } }
 * ], 'user.age')
 * // => Map { 40 => 2, 36 => 1 }
 * ```
 */
export function countByToMap<T, K>(
  collection: T[] | Record<string, T>,
  iteratee: ((value: T) => K) | string,
): Map<K, number> {
  const map = new Map<K, number>()

  if (!collection) {
    return map
  }

  const items = Array.isArray(collection) ? collection : Object.values(collection)
  const length = items.length

  if (length === 0) {
    return map
  }

  if (typeof iteratee === 'function') {
    // Function iteratee
    for (let i = 0; i < length; i++) {
      const item = items[i]
      const key = iteratee(item)
      const count = map.get(key) || 0
      map.set(key, count + 1)
    }
  } else {
    // String iteratee
    const path = iteratee as string
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      // Simple property access
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = (item as any)?.[path]
        const count = map.get(key) || 0
        map.set(key, count + 1)
      }
    } else {
      // Complex path
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = get(item as unknown as Record<string, unknown>, path) as K
        const count = map.get(key) || 0
        map.set(key, count + 1)
      }
    }
  }

  return map
}
