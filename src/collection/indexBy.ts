import { get } from '../object/get.js'

/**
 * Indexes a collection into a Map of key -> last item with that key.
 *
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 *
 * @example
 * ```typescript
 * indexBy([{id:1},{id:2}], 'id')
 * // => Map { 1 => {id:1}, 2 => {id:2} }
 *
 * indexBy([
 *   { user: { name: 'fred', age: 40 } },
 *   { user: { name: 'barney', age: 36 } },
 *   { user: { name: 'fred', age: 50 } }
 * ], 'user.name')
 * // => Map { 'fred' => {user: {name: 'fred', age: 50}}, 'barney' => {...} }
 * ```
 */
export function indexBy<T, K>(collection: T[] | Record<string, T>, iteratee: ((value: T) => K) | string): Map<K, T> {
  const map = new Map<K, T>()

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
      map.set(key, item)
    }
  } else {
    // String iteratee
    const path = iteratee as string
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      // Simple property access
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = (item as any)?.[path]
        map.set(key, item)
      }
    } else {
      // Complex path
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = get(item as unknown as Record<string, unknown>, path) as K
        map.set(key, item)
      }
    }
  }

  return map
}
