import { get } from '../object/get.js'

/**
 * Groups a collection by a key selector into a Map of key -> items[].
 *
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 *
 * @example
 * ```typescript
 * groupToMap(['a','bb','c'], 'length')
 * // => Map { 1 => ['a','c'], 2 => ['bb'] }
 *
 * groupToMap([
 *   { user: { name: 'fred', age: 40 } },
 *   { user: { name: 'barney', age: 36 } },
 *   { user: { name: 'fred', age: 40 } }
 * ], 'user.name')
 * // => Map { 'fred' => [obj1, obj3], 'barney' => [obj2] }
 * ```
 */
export function groupToMap<T, K>(
  collection: T[] | Record<string, T>,
  iteratee: ((value: T) => K) | string,
): Map<K, T[]> {
  const map = new Map<K, T[]>()

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
      const group = map.get(key)
      if (group) {
        group.push(item)
      } else {
        map.set(key, [item])
      }
    }
  } else {
    // String iteratee
    const path = iteratee as string
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      // Simple property access
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = (item as any)?.[path]
        const group = map.get(key)
        if (group) {
          group.push(item)
        } else {
          map.set(key, [item])
        }
      }
    } else {
      // Complex path
      for (let i = 0; i < length; i++) {
        const item = items[i]
        const key = get(item as unknown as Record<string, unknown>, path) as K
        const group = map.get(key)
        if (group) {
          group.push(item)
        } else {
          map.set(key, [item])
        }
      }
    }
  }

  return map
}
